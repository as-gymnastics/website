'use client'

import React, { useEffect, useState } from 'react'
import { Star } from 'lucide-react'
import Image from 'next/image'

interface Review {
  author_name: string
  author_url: string
  language: string
  original_language: string
  profile_photo_url: string
  rating: number
  relative_time_description: string
  text: string
  time: number
  translated: boolean
}

interface PlaceDetails {
  result: {
    name: string
    rating: number
    reviews: Review[]
    url: string
    user_ratings_total: number
  }
}

export const GoogleReviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [placeData, setPlaceData] = useState<PlaceDetails['result'] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews')
        if (!response.ok) {
          throw new Error('Failed to fetch reviews')
        }
        const data = await response.json()
        setPlaceData(data)
        // API returns up to 5 reviews by default.
        // User requested top 5 "exactly as returned".
        setReviews(data.reviews || [])
      } catch (err) {
        setError('Could not load reviews')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [])

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error || !placeData) return null

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2">
              <Star className="w-4 h-4 fill-current" />
              google rating {placeData.rating} ({placeData.user_ratings_total} recenzii)
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Ce spun clienții despre noi
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Părerea ta contează! Ne bucurăm să vedem cum experiența la {placeData.name} inspiră
            comunitatea noastră.
          </p>
          <a
            href={placeData.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 group"
          >
            Vezi toate recenziile pe Google Maps
            <Star className="w-4 h-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {reviews.slice(0, 5).map((review, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-2xl p-6 flex flex-col h-full border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative group"
            >
              {/* Author Info */}
              <div className="flex items-center gap-3 mb-4">
                <a
                  href={review.author_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0"
                >
                  {review.profile_photo_url ? (
                    <Image
                      src={review.profile_photo_url}
                      alt={review.author_name}
                      width={40}
                      height={40}
                      className="rounded-full ring-2 ring-white"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                      {review.author_name.charAt(0)}
                    </div>
                  )}
                </a>
                <div className="min-w-0 flex-1">
                  <a
                    href={review.author_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-gray-900 text-sm hover:underline truncate block"
                  >
                    {review.author_name}
                  </a>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          i < review.rating ? 'fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="text-gray-400 ml-1.5 font-normal">
                      {review.relative_time_description}
                    </span>
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <div className="flex-grow">
                {/* Google logo as background watermark could be nice, but explicit visible logo requested */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-6 mb-4 relative z-10">
                  {review.text}
                </p>
              </div>

              {/* View on Google Link for individual review is usually just the place link, API doesn't give deep link to specific review easily without scraping.
                   But we can link author url or place url with hash.
                   Wait, requirement 3: Link EACH review ... back to the original Google Maps listing.
                   So linking the whole card or a footer link is fine.
               */}
              <a
                href={placeData.url} // Or review.author_url for author profile
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 z-0"
                aria-label="View on Google Maps"
              ></a>

              {/* Powered by Google - per card or per section?
                   "Include a visible 'Powered by Google' logo within the review container."
                   If "review container" means the SECTION, one logo is enough.
                   If it means EACH CARD, then small logo in each.
                   Standard is one per list.
                   I'll put it in the footer of the section.
               */}
            </div>
          ))}
        </div>

        {/* Footer Link & Logo */}
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="font-medium">Powered by</span>
            {/* Google Logo Text style */}
            <span className="font-bold text-gray-500 text-lg tracking-tight">
              <span className="text-blue-500">G</span>
              <span className="text-red-500">o</span>
              <span className="text-yellow-500">o</span>
              <span className="text-blue-500">g</span>
              <span className="text-green-500">l</span>
              <span className="text-red-500">e</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
