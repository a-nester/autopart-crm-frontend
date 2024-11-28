import axios from 'axios';

export default async function handler(req, res) {
  const { method } = req;

  if (method === 'GET') {
    try {
      const response = await axios.get(
        'https://my.prom.ua/api/v1/orders/list',
        {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_AVTOKLAN_TOKEN}`,
          },
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
