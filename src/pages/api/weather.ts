import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.WEATHER_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cityValue, lat, lon } = req.query;
  let query: string;

  if (cityValue) {
    query = cityValue.toString();
  } else if (lat && lon) {
    query = `${lat},${lon}`;
  } else {
    res.status(400).json({ error: 'cityValue or lat and lon are required' });
    return;
  }

  const response = await fetch(
    `${process.env.WEATHER_API_URL}?key=${apiKey}&q=${query}&days=2`
  );
  const data = await response.json();

  if (data.error) {
    res.status(data.error.code || 400).json({ error: data.error.message });
  } else {
    res.status(200).json(data);
  }
}
