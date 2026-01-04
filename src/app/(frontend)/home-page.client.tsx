'use client'

import React, { useState, useEffect } from 'react'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Coaches } from '@/components/Coaches'
import { Groups } from '@/components/Groups'
import { Experience } from '@/components/Experience'
import { Contact } from '@/components/Contact'
import { RegistrationForm } from '@/components/RegistrationForm'
import type { Coach, Group } from '@/payload-types'

interface HomePageClientProps {
  coaches: Coach[]
  groups: Group[]
}

export default function HomePageClient({ coaches, groups }: HomePageClientProps) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  return (
    <>
      <Hero onRegisterClick={() => setIsRegistrationOpen(true)} />
      <Philosophy />
      <Coaches coaches={coaches} />
      <Groups groups={groups} onRegisterClick={() => setIsRegistrationOpen(true)} />
      <Experience />
      <Contact />

      <RegistrationForm
        isOpen={isRegistrationOpen}
        onClose={() => setIsRegistrationOpen(false)}
        groups={groups}
      />
    </>
  )
}
