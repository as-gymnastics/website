import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { LandingPage } from '@/components/LandingPage'

export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
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
    <main className="w-full bg-[#050505] min-h-screen flex flex-col justify-start items-center relative">
      <LandingPage groups={groupsData.docs} />
    </main>
  )
}
