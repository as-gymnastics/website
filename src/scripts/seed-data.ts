import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedCoachesAndGroups() {
  console.log('Seeding coaches...')
  console.log('Seeding completed!')
}

// Run if called directly
if (require.main === module) {
  seedCoachesAndGroups()
    .then(() => {
      console.log('Done!')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Error seeding:', error)
      process.exit(1)
    })
}
