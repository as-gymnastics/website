'use client'

import { Group } from '@/payload-types'
import { RegistrationForm } from './RegistrationForm'
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export function LandingPage({ groups }: { groups: Group[] }) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(undefined)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [isAtBottom, setIsAtBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true)
      } else {
        setShowScrollTop(false)
      }

      // Check if user has reached the bottom (within 100px)
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
      setIsAtBottom(isBottom)
    }

    // Call once to set initial state
    handleScroll()

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <div
        className="absolute top-[40rem] right-auto z-10 md:top-[90vh] md:right-auto"
        onClick={() => setIsRegistrationOpen(true)}
      >
        <button className="bg-[#7159a5] text-white px-16 py-2 md:px-8 md:py-3 hover:bg-[#5f4692] rounded-xl font-bold uppercase tracking-wider shadow-lg transition-colors pointer-events-auto cursor-pointer">
          Inscrie-te acum
        </button>
      </div>

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => {
          setIsRegistrationOpen(false)
          setSelectedGroupId(undefined)
        }}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />

      <div className="w-full relative select-none pointer-events-none">
        <picture className="w-full block">
          {/* Desktop image for screens MD and up */}
          <source srcSet="/media/desktop-landing.png" media="(min-width: 768px)" />
          {/* Default mobile image */}
          <img
            src="/media/mobile-landing.png"
            alt=""
            className="w-full h-auto block"
            draggable={false}
          />
        </picture>
      </div>

      {showScrollTop && (
        <div className="fixed bottom-6 right-6 z-50 transition-opacity duration-300 pointer-events-auto">
          <button
            onClick={scrollToTop}
            className="bg-[#7159a5] text-white p-3 md:p-4 rounded-xl shadow-lg hover:bg-[#5f4692] transition-colors cursor-pointer flex items-center justify-center pointer-events-auto"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      )}
    </>
  )
}
