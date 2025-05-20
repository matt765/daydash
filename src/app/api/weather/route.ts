import { NextRequest, NextResponse } from 'next/server';

const apiKey = process.env.WEATHER_API_KEY;

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const cityValue = searchParams.get('cityValue');
  const lat = searchParams.get('lat');
  const lon = searchParams.get('lon');

  let query: string;

  if (cityValue) {
    query = cityValue;
  } else if (lat && lon) {
    query = `${lat},${lon}`;
  } else {
    return NextResponse.json(
      { error: 'cityValue or lat and lon are required' },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(
      `${process.env.WEATHER_API_URL}?key=${apiKey}&q=${query}&days=2`
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Weather API response error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error.message },
        { status: data.error.code || 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch weather data' },
      { status: 500 }
    );
  }
}
