import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import HomePageClient from './home-page.client'
import type { Coach, Group } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch active coaches
  const coachesData = await payload.find({
    collection: 'coaches',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'order',
    limit: 100,
  })

  // Fetch active groups
  const groupsData = await payload.find({
    collection: 'groups',
    where: {
      active: {
        equals: true,
      },
    },
    sort: 'order',
    limit: 100,
  })

  return (
    <main>
      <HomePageClient coaches={coachesData.docs as Coach[]} groups={groupsData.docs as Group[]} />
    </main>
  )
}
