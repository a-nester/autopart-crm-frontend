import axios from 'axios';
import { error } from 'console';

export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET') {
    const { storeId, URL, limit, last_id, group_id } = query;
    console.log(storeId, URL);

        const STORES = {
  AvtoKlan: { token: process.env.NEXT_PUBLIC_AVTOKLAN_TOKEN,    
  },
  AutoAx: { token: process.env.NEXT_PUBLIC_AUTOAX_TOKEN,    
  },
  iDoAuto: { token: process.env.NEXT_PUBLIC_IDOAUTO_TOKEN,    
  },
  ToAuto: { token: process.env.NEXT_PUBLIC_TOAUTO_TOKEN,    
  },
}

    const store = STORES[storeId];
    

    if (!store) {
      return res.status(400).json({error: 'Invalid store ID'})
    }

    try {
      const response = await axios.get(
        URL,
        {
          baseURL: 'https://my.prom.ua/api/v1/',
          headers: {
            Authorization: `Bearer ${store.token}`,
          },
          params: {
            limit,
            last_id, 
            group_id,
          }
        },
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(error.response?.status || 500).json({ error: error.message });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
