'use client'

import React, { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Coaches } from '@/components/Coaches'
import { Groups } from '@/components/Groups'
import { Experience } from '@/components/Experience'
import { Contact } from '@/components/Contact'
import { RegistrationForm } from '@/components/RegistrationForm'
import type { Coach, Group, Page } from '@/payload-types'

interface HomePageClientProps {
  coaches: Coach[]
  groups: Group[]
  hero?: Page['hero']
}

export default function HomePageClient({ coaches, groups, hero }: HomePageClientProps) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(undefined)

  const handleRegisterClick = (groupId?: number) => {
    setSelectedGroupId(groupId)
    setIsRegistrationOpen(true)
  }

  return (
    <>
      <Hero onRegisterClick={() => handleRegisterClick()} heroData={hero} />
      <Philosophy />
      <Coaches coaches={coaches} />
      <Groups groups={groups} onRegisterClick={handleRegisterClick} />
      <Experience />
      <Contact />

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => {
          setIsRegistrationOpen(false)
          setSelectedGroupId(undefined)
        }}
        groups={groups}
        selectedGroupId={selectedGroupId}
      />
    </>
  )
}
