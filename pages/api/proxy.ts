import { NextApiRequest, NextApiResponse } from 'next';
import { getTokenByService } from '@/helpers/getTokenByService';
import axios from 'axios';
// import { error } from 'console';

const SERVICES = {
    prom: {
      baseURL: 'https://my.prom.ua/api/v1/',
    },
    myApp: {
      baseURL: 'http://93.183.216.213:8080/',
    }
}

type ServiceType = keyof typeof SERVICES;
  
async function makeRequest({ method, service, storeId, URL, queryParams, body }:
  { method: string, service: ServiceType, storeId: string, URL: string, queryParams: string, body: string }) {
  const tokenObj = getTokenByService(service, storeId);

  if (!tokenObj) {
    throw new Error('Invalid store ID');
  }

  const serviceConfig = SERVICES[service];

  if (!serviceConfig) {
    throw new Error('Invalid service');
  }

  return await axios({
    method,
    url: URL,
    baseURL: serviceConfig.baseURL,
    headers: {
      Authorization: `Bearer ${tokenObj.token}`,
      'Content-Type': 'application/json',
    },
    data: method === 'POST' ? body : undefined,
    params: method === 'GET' ? queryParams: undefined,
  })
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method, query, body } = req;
  const { service, storeId, URL, limit, last_id, group_id } = query;

  if (!service || typeof service !== 'string' || !(service in SERVICES)) {
    return res.status(400).json({ error: 'Invalid or missing service parameter' });
  }

  const queryParams = { limit, last_id, group_id };

  if (method === 'GET' || method === 'POST') {
    try {
      console.log({ method, query, body }, { service, storeId, URL, limit, last_id, group_id });
      const response = await makeRequest({
        method,
        service: service as ServiceType,
        storeId: storeId as string,
        URL: URL as string,
        queryParams: queryParams as unknown as string,
        body,
      });

      res.status(200).json(response.data);
    } catch (error: unknown) {
      // Перевірка типу помилки
      if (axios.isAxiosError(error)) {
        // Якщо це помилка Axios
        res.status(error.response?.status || 500).json({
          error: error.response?.data?.message || error.message || 'Internal Server Error',
        });
      } else if (error instanceof Error) {
        // Якщо це стандартна помилка
        res.status(500).json({ error: error.message });
      } else {
        // У разі невідомої помилки
        res.status(500).json({ error: 'Unknown error occurred' });
      }
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
