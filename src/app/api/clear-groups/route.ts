import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST() {
  try {
    const payload = await getPayload({ config })

    console.log('Deleting all groups...')

    // Get all groups
    const groups = await payload.find({
      collection: 'groups',
      limit: 1000,
    })

    // Delete each group
    for (const group of groups.docs) {
      await payload.delete({
        collection: 'groups',
        id: group.id,
      })
      console.log(`Deleted group: ${group.name}`)
    }

    console.log('All groups deleted!')

    return NextResponse.json({
      success: true,
      message: `Deleted ${groups.docs.length} groups successfully!`,
    })
  } catch (error) {
    console.error('Delete error:', error)
    return NextResponse.json({ error: 'Failed to delete groups' }, { status: 500 })
  }
}
