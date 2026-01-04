import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@/payload.config'

export async function POST() {
  try {
    const payload = await getPayload({ config })
    console.log('Seeding groups...')

    // Create all training groups with new schedule structure
    const groups = [
      {
        name: 'Baby Gym I',
        ageRange: '3-4 ani (fete)',
        scheduleDays: ['luni', 'miercuri'],
        startTime: '16:20',
        endTime: '17:00',
        price: 320,
        active: true,
        order: 1,
      },
      {
        name: 'Baby Gym II',
        ageRange: '3-4 ani (fete)',
        scheduleDays: ['marti'],
        startTime: '17:00',
        endTime: '18:00',
        price: 300,
        active: true,
        order: 2,
      },
      {
        name: 'AS Bronze',
        ageRange: '5-7 ani (fete)',
        scheduleDays: ['miercuri', 'joi', 'vineri'],
        startTime: '17:00',
        endTime: '19:00',
        price: 300,
        active: true,
        order: 3,
      },
      {
        name: 'AS Bronze II',
        ageRange: '8-12 ani (fete)',
        scheduleDays: ['miercuri'],
        startTime: '19:00',
        endTime: '20:00',
        price: 300,
        active: true,
        order: 4,
      },
      {
        name: 'AS Silver I, II',
        ageRange: '5-7 ani (fete)',
        scheduleDays: ['luni', 'miercuri', 'marti', 'joi'],
        startTime: '17:00',
        endTime: '19:00',
        price: 350,
        active: true,
        order: 5,
      },
      {
        name: 'AS Silver III',
        ageRange: '8-12 ani (fete)',
        scheduleDays: ['marti', 'joi'],
        startTime: '19:00',
        endTime: '20:00',
        price: 350,
        active: true,
        order: 6,
      },
      {
        name: 'AS Gold',
        ageRange: '7-10 ani (fete)',
        scheduleDays: ['luni', 'vineri'],
        startTime: '18:00',
        endTime: '20:00',
        price: 450,
        active: true,
        order: 7,
      },
      {
        name: 'Mini Gym',
        ageRange: '2-4 ani (fete)',
        scheduleDays: ['sambata'],
        startTime: '10:00',
        endTime: '11:00',
        additionalInfo: 'Prezența unui părinte este obligatorie',
        price: 300,
        active: true,
        order: 8,
      },
    ]

    for (const group of groups) {
      await payload.create({
        collection: 'groups',
        data: group,
      })
      console.log(`Created group: ${group.name}`)
    }

    return NextResponse.json({ success: true, message: 'Data seeded successfully!' })
  } catch (error) {
    console.error('Seeding error:', error)
    return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
  }
}
