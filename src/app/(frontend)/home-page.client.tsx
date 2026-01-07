'use client'

import React, { useState } from 'react'
import { Hero } from '@/components/Hero'
import { Philosophy } from '@/components/Philosophy'
import { Coaches } from '@/components/Coaches'
import { Groups } from '@/components/Groups'
import { Contact } from '@/components/Contact'
import { RegistrationForm } from '@/components/RegistrationForm'
import { GoogleReviews } from '@/components/GoogleReviews'
import type { Coach, Group, Page } from '@/payload-types'
import { ScheduleModal } from '@/components/ScheduleModal'

interface HomePageClientProps {
  coaches: Coach[]
  groups: Group[]
  hero?: Page['hero']
  philosophy?: Page['philosophy']
  coachesSection?: Page['coachesSection']
}

export default function HomePageClient({
  coaches,
  groups,
  hero,
  philosophy,
  coachesSection,
}: HomePageClientProps) {
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isScheduleOpen, setIsScheduleOpen] = useState(false)
  const [selectedGroupId, setSelectedGroupId] = useState<number | undefined>(undefined)

  const handleRegisterClick = (groupId?: number) => {
    setSelectedGroupId(groupId)
    setIsRegistrationOpen(true)
  }

  return (
    <>
      <Hero
        onRegisterClick={() => handleRegisterClick()}
        onViewScheduleClick={() => setIsScheduleOpen(true)}
        heroData={hero}
      />
      <Coaches coaches={coaches} intro={coachesSection} />
      <Philosophy philosophyData={philosophy} />
      <Groups groups={groups} onRegisterClick={handleRegisterClick} />
      <GoogleReviews />
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

      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        scheduleImage={hero?.scheduleImage}
      />
    </>
  )
}
