/**
 * Google Places API Integration
 * Search for prisons, jails, and correctional facilities
 */

export interface FacilitySearchResult {
  placeId: string
  name: string
  address: string
  city?: string
  state?: string
  zipCode?: string
  phone?: string
  website?: string
  location: {
    lat: number
    lng: number
  }
  type: string // 'prison' | 'jail' | 'juvenile' | 'detention'
  distance?: number
}

/**
 * Search for correctional facilities using Google Places API
 */
export async function searchFacilities(
  query: string,
  location?: { lat: number; lng: number },
  radius: number = 100000 // 100km default
): Promise<FacilitySearchResult[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    throw new Error('Google Maps API key not configured')
  }

  // Build search query
  const searchTerms = [
    'prison',
    'correctional facility',
    'detention center',
    'jail',
    'juvenile hall'
  ]

  const searchQuery = query.toLowerCase().includes('prison') 
    ? query 
    : `${query} ${searchTerms.join(' OR ')}`

  // Use Text Search
  const url = new URL('https://maps.googleapis.com/maps/api/place/textsearch/json')
  url.searchParams.append('query', searchQuery)
  url.searchParams.append('key', apiKey)
  
  if (location) {
    url.searchParams.append('location', `${location.lat},${location.lng}`)
    url.searchParams.append('radius', radius.toString())
  }

  const response = await fetch(url.toString())
  const data = await response.json()

  if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
    console.error('Google Places API error:', data)
    return []
  }

  // Map results to our format
  return data.results.map((result: any) => ({
    placeId: result.place_id,
    name: result.name,
    address: result.formatted_address,
    location: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    },
    type: determineFacilityType(result.name, result.types)
  }))
}

/**
 * Get detailed information about a facility
 */
export async function getFacilityDetails(placeId: string): Promise<FacilitySearchResult | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    throw new Error('Google Maps API key not configured')
  }

  const url = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  url.searchParams.append('place_id', placeId)
  url.searchParams.append('fields', 'name,formatted_address,formatted_phone_number,website,geometry,address_components')
  url.searchParams.append('key', apiKey)

  const response = await fetch(url.toString())
  const data = await response.json()

  if (data.status !== 'OK') {
    return null
  }

  const result = data.result

  // Parse address components
  const addressComponents = result.address_components || []
  const city = addressComponents.find((c: any) => c.types.includes('locality'))?.long_name
  const state = addressComponents.find((c: any) => c.types.includes('administrative_area_level_1'))?.short_name
  const zipCode = addressComponents.find((c: any) => c.types.includes('postal_code'))?.long_name

  return {
    placeId: placeId,
    name: result.name,
    address: result.formatted_address,
    city,
    state,
    zipCode,
    phone: result.formatted_phone_number,
    website: result.website,
    location: {
      lat: result.geometry.location.lat,
      lng: result.geometry.location.lng
    },
    type: determineFacilityType(result.name, [])
  }
}

/**
 * Determine facility type from name and Google types
 */
function determineFacilityType(name: string, types: string[]): string {
  const nameLower = name.toLowerCase()
  
  if (nameLower.includes('juvenile') || nameLower.includes('youth')) {
    return 'juvenile'
  }
  if (nameLower.includes('detention') || nameLower.includes('ice')) {
    return 'detention'
  }
  if (nameLower.includes('jail') || nameLower.includes('county')) {
    return 'jail'
  }
  if (nameLower.includes('prison') || nameLower.includes('correctional') || nameLower.includes('penitentiary')) {
    return 'prison'
  }
  
  return 'prison' // default
}

/**
 * Geocode an address to get coordinates
 */
export async function geocodeAddress(address: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

  if (!apiKey) {
    throw new Error('Google Maps API key not configured')
  }

  const url = new URL('https://maps.googleapis.com/maps/api/geocode/json')
  url.searchParams.append('address', address)
  url.searchParams.append('key', apiKey)

  const response = await fetch(url.toString())
  const data = await response.json()

  if (data.status !== 'OK' || !data.results.length) {
    return null
  }

  return {
    lat: data.results[0].geometry.location.lat,
    lng: data.results[0].geometry.location.lng
  }
}

