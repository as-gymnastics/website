'use client'

import React from 'react'
import { Button } from './ui/button'

interface HeroProps {
  onRegisterClick: () => void
}

export const Hero: React.FC<HeroProps> = ({ onRegisterClick }) => {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-white py-12 md:py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-4 md:space-y-6">
            <div className="inline-block">
              <span className="text-gray-700 text-xs md:text-sm font-semibold uppercase tracking-wide">
                AS Gymnastics
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
              Gimnastica este <span className="text-gym-blue">baza tuturor</span> sporturilor
            </h1>

            <p className="text-base md:text-lg text-gray-600 max-w-xl">
              Pentru că aici nu este vorba doar despre gimnastică. Este despre disciplină, eleganță,
              echilibru și, mai ales, despre un mindset de învingător.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 md:pt-4">
              <Button
                onClick={onRegisterClick}
                size="lg"
                className="bg-blue-700 hover:bg-blue-700 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transition-all w-full sm:w-auto"
              >
                📝 Înscriere Instant
              </Button>
            </div>

            {/* Stats/Social Proof */}
            <div className="flex items-center gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-300 border-2 border-white"
                  />
                ))}
              </div>
              <div>
                <p className="text-xs md:text-sm text-gray-600">
                  <span className="font-semibold text-gray-900">Peste 100 de copii</span> antrenați
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative bg-gym-peach rounded-3xl overflow-hidden aspect-[4/5] max-w-md mx-auto lg:max-w-none">
              {/* Placeholder for gymnast image */}
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                <div className="text-center text-gray-400">
                  <img src="/api/media/file/poza_as_gyms.jpg" alt="" />
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-gym-yellow rounded-full opacity-20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-gym-blue rounded-full opacity-20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
