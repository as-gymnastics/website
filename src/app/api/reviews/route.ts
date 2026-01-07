import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.AS_GYMNASTICS_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Missing GOOGLE_PLACES_API_KEY or AS_GYMNASTICS_PLACE_ID' },
      { status: 500 },
    )
  }

  try {
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,reviews,url,user_ratings_total&key=${apiKey}&language=ro`

    const response = await fetch(url, {
      cache: 'no-store',
    })

    const data = await response.json()

    if (data.status !== 'OK') {
      console.error('Google Places API Error:', data)
      return NextResponse.json(
        { error: data.error_message || 'Failed to fetch reviews' },
        { status: 400 },
      )
    }

    // Return the result object which contains name, parsing, reviews, etc.
    return NextResponse.json(data.result)
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
