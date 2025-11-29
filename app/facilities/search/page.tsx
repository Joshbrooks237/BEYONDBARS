'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, MapPin, Phone, Globe, Navigation, ArrowLeft } from 'lucide-react'

interface Facility {
  id: string
  name: string
  address: string
  location?: {
    lat: number
    lng: number
  }
  types?: string[]
  phone?: string
  website?: string
}

export default function FacilitySearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<Facility[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!searchQuery.trim()) {
      setError('Please enter a search term')
      return
    }

    setLoading(true)
    setError('')

    try {
      // Build URL with optional location
      let url = `/api/facilities/search?q=${encodeURIComponent(searchQuery)}`
      if (userLocation) {
        url += `&lat=${userLocation.lat}&lng=${userLocation.lng}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data.error) {
        setError(data.error)
        setResults([])
      } else {
        setResults(data.results || [])
        if (data.results.length === 0) {
          setError('No facilities found. Try a different search term.')
        }
      }
    } catch (err) {
      setError('Failed to search facilities. Please try again.')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  const getUserLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
          alert('Location enabled! Search results will be sorted by distance.')
        },
        (error) => {
          console.error('Geolocation error:', error)
          alert('Could not get your location. Search will show all results.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser')
    }
  }

  const getFacilityType = (types: string[] = []) => {
    const typeStr = types.join(' ').toLowerCase()
    if (typeStr.includes('juvenile')) return '🏫 Juvenile Facility'
    if (typeStr.includes('detention')) return '🏢 Detention Center'
    if (typeStr.includes('jail')) return '🏛️ County Jail'
    return '🏛️ Correctional Facility'
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-xl font-semibold text-gray-900">Find a Facility</h1>
            <div className="w-32"></div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Banner */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-blue-900 mb-2">🔍 Search for Any Facility</h2>
          <p className="text-sm text-blue-800">
            Search by facility name, city, or state. We'll help you find the exact location and contact information.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search for a facility
              </label>
              <div className="flex space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="e.g., 'San Quentin', 'Los Angeles County Jail', 'California State Prison'"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary px-8 disabled:opacity-50"
                >
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>

            {/* Location Helper */}
            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={getUserLocation}
                className="text-sm text-primary-600 hover:text-primary-700 flex items-center space-x-1"
              >
                <Navigation className="h-4 w-4" />
                <span>{userLocation ? '✓ Location enabled' : 'Use my location for nearby results'}</span>
              </button>
              <p className="text-xs text-gray-500">
                Powered by Google Maps
              </p>
            </div>
          </form>

          {/* Example Searches */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">Example searches:</p>
            <div className="flex flex-wrap gap-2">
              {[
                'San Quentin State Prison',
                'Los Angeles Juvenile Hall',
                'Orange County Jail',
                'Pelican Bay'
              ].map((example) => (
                <button
                  key={example}
                  onClick={() => setSearchQuery(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Found {results.length} {results.length === 1 ? 'facility' : 'facilities'}
            </h3>
            
            {results.map((facility) => (
              <div
                key={facility.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:border-primary-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary-600 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg mb-1">
                          {facility.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {getFacilityType(facility.types)}
                        </p>
                        <p className="text-gray-700 mb-3">
                          {facility.address}
                        </p>

                        {/* Contact Info */}
                        <div className="flex flex-wrap gap-4 text-sm">
                          {facility.phone && (
                            <div className="flex items-center space-x-1 text-gray-600">
                              <Phone className="h-4 w-4" />
                              <span>{facility.phone}</span>
                            </div>
                          )}
                          {facility.website && (
                            <a
                              href={facility.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-1 text-primary-600 hover:text-primary-700"
                            >
                              <Globe className="h-4 w-4" />
                              <span>Website</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(facility.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary text-sm whitespace-nowrap"
                    >
                      View on Map
                    </a>
                    <button className="btn-primary text-sm whitespace-nowrap">
                      Select Facility
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!loading && results.length === 0 && searchQuery && !error && (
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              No facilities found. Try a different search term or location.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

