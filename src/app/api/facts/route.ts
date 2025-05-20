import { NextResponse } from 'next/server';

const baseFactsApiUrl = process.env.FACTS_API_URL || '';

export async function GET() {
  try {
    const factsApiUrl = `${baseFactsApiUrl}?language=en`;
    const response = await fetch(factsApiUrl);

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Facts API response error: ${errorText}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching facts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch facts' },
      { status: 500 }
    );
  }
}
