'use client'

import { Group } from '@/payload-types'
import { RegistrationForm } from './RegistrationForm'
import { useState } from 'react'

export function LandingPage({ groups }: { groups: Group[] }) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(undefined)

  return (
    <>
      <div
        className="absolute top-[40rem] right-auto z-10 md:top-[50rem] md:right-auto"
        onClick={() => setIsRegistrationOpen(true)}
      >
        <button className="bg-[#7159a5] text-white px-16 py-2 md:px-8 md:py-3 rounded-xl font-bold uppercase tracking-wider shadow-lg transition-colors pointer-events-auto cursor-pointer">
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
    </>
  )
}
