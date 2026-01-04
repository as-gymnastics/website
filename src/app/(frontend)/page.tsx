import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import HomePageClient from './home-page.client'
import type { Coach, Group, Page } from '@/payload-types'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch the home page data
  const homePageData = await payload.find({
    collection: 'pages',
    where: {
      slug: {
        equals: 'home',
      },
    },
    depth: 1, // Populate relations like media
    limit: 1,
  })

  const homePage = homePageData.docs?.[0] as Page | undefined

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
      <HomePageClient
        coaches={coachesData.docs as Coach[]}
        groups={groupsData.docs as Group[]}
        hero={homePage?.hero}
      />
    </main>
  )
}
