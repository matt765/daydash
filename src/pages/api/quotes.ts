// pages/api/quotes.ts
import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.API_NINJAS_API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { category } = req.query;

  if (!apiKey) {
    res.status(500).json({ error: 'API key is missing' });
    return;
  }

  const response = await fetch(
    `https://api.api-ninjas.com/v1/quotes?category=${category}`,
    {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      } as HeadersInit, // Add type assertion here
    }
  );
  const data = await response.json();
  res.status(200).json(data);
}
