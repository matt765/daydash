import { NextResponse } from 'next/server';

const apiKey = process.env.QUOTES_API_KEY;
const apiUrl = process.env.QUOTES_API_URL || '';

export async function GET() {
  if (!apiKey) {
    return NextResponse.json({ error: 'API key is missing' }, { status: 500 });
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      } as HeadersInit,
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `API response error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching quotes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quotes' },
      { status: 500 }
    );
  }
}
