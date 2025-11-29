import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q')
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 })
  }

  try {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 })
    }

    // Build search query for correctional facilities
    const searchQuery = `${query} prison OR jail OR correctional facility OR detention center`

    // Use Google Places Text Search
    const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
    url.searchParams.append('query', searchQuery)
    url.searchParams.append('key', apiKey)
    
    if (lat && lng) {
      url.searchParams.append('location', `${lat},${lng}`)
      url.searchParams.append('radius', '100000') // 100km
    }

    const response = await fetch(url.toString())
    const data = await response.json()

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      console.error('Google Places API error:', data)
      return NextResponse.json({ error: 'Search failed', details: data.status }, { status: 500 })
    }

    // Format results
    const results = (data.results || []).map((place: any) => ({
      id: place.place_id,
      name: place.name,
      address: place.formatted_address,
      location: place.geometry?.location,
      types: place.types,
      rating: place.rating,
      businessStatus: place.business_status
    }))

    return NextResponse.json({ results })

  } catch (error) {
    console.error('Facility search error:', error)
    return NextResponse.json({ error: 'Search failed' }, { status: 500 })
  }
}

