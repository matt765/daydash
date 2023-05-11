import type { NextApiRequest, NextApiResponse } from 'next';

const apiKey = process.env.OPEN_WEATHER_API_KEY;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cityValue, lat, lon } = req.query;

  if (cityValue) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}`
    );
    const data = await response.json();

    if (data.cod === '404') {
      res.status(404).json({ error: data.message });
    } else {
      res.status(200).json(data);
    }
  } else if (lat && lon) {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={daily}&appid=${apiKey}`
    );
    const data = await response.json();
    res.status(200).json(data);
  } else {
    res.status(400).json({ error: 'cityValue or lat and lon are required' });
  }
}
