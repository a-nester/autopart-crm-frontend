import { getTokenByService } from '@/app/helpers/getTokenByService';
import axios from 'axios';
// import { error } from 'console';

const SERVICES = {
    prom: {
      baseURL: 'https://my.prom.ua/api/v1/',
    },
    myApp: {
      baseURL: 'http://93.183.216.213:3000/',
    }
}
  
async function makeRequest({ method, service, storeId, URL, queryParams, body }:
  { method: string, service: string, storeId: string, URL: string, queryParams: string, body: string }) {
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
      Authorization: `Bearer ${tokenObj.token}`
    },
    params: queryParams,
    data: body,
  })
}

export default async function handler(req, res) {
  const { method, query, body } = req;
  const { service, storeId, URL, limit, last_id, group_id } = query;

    const queryParams = { limit, last_id, group_id }

  if (method === 'GET' || method === 'POST') {
    try {
      const response = await makeRequest({ method, service, storeId, URL, queryParams, body })
        
      res.status(200).json(response.data);
    } catch (error: any) {
      res
        .status(error.response?.status || 500)
        .json({ error: error.message || 'Internal Server Error' });
    }
  } 
    else {
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
    }
}
