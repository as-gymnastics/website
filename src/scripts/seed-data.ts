import { getPayload } from 'payload'
import config from '@/payload.config'

export async function seedCoachesAndGroups() {
  const payload = await getPayload({ config })

  console.log('Seeding coaches...')

  // Create Stefan Muțiu
  await payload.create({
    collection: 'coaches',
    data: {
      name: 'Stefan Muțiu',
      title: 'Antrenor Principal',
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '20 de ani ca sportiv de performanță',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '12 ani de experiență ca antrenor',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '9 ani ca mentor al stilului de viață sănătos',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Peste 600 de sportivi antrenați',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      backgroundColor: 'blue',
      active: true,
      order: 1,
    },
  })

  console.log('Created Stefan Muțiu')

  // Create Amelia Racea
  await payload.create({
    collection: 'coaches',
    data: {
      name: 'Amelia Racea',
      title: 'Antrenor Certificat',
      bio: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '15 ani în gimnastica de performanță',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Campioană europeană la bârnă',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Medaliată la Festivalul Olimpic',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: '10 ani de experiență ca antrenor',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      backgroundColor: 'peach',
      active: true,
      order: 2,
    },
  })

  console.log('Created Amelia Racea')

  console.log('Seeding groups...')

  // Create all training groups
  const groups = [
    {
      name: 'Baby Gym I',
      ageRange: '3-4 ani (fete)',
      schedule: '2x săptămână\nLuni + Miercuri\nOra: 16:20 - 17:00',
      price: 320,
      active: true,
      order: 1,
    },
    {
      name: 'Baby Gym II',
      ageRange: '3-4 ani (fete)',
      schedule: '1x săptămână\nMarți\nOra: 17:00 - 18:00',
      price: 300,
      active: true,
      order: 2,
    },
    {
      name: 'AS Bronze',
      ageRange: '5-7 ani (fete)',
      schedule: '1x săptămână\nMiercuri 18:00 - 19:00\nJoi / Vineri 17:00 - 18:00',
      price: 300,
      active: true,
      order: 3,
    },
    {
      name: 'AS Bronze II',
      ageRange: '8-12 ani (fete)',
      schedule: '1x săptămână\nMiercuri\nOra: 19:00 - 20:00',
      price: 300,
      active: true,
      order: 4,
    },
    {
      name: 'AS Silver I, II',
      ageRange: '5-7 ani (fete)',
      schedule: '2x săptămână\nLuni + Miercuri 17:00 - 18:00\nMarți + Joi 18:00 - 19:00',
      price: 350,
      active: true,
      order: 5,
    },
    {
      name: 'AS Silver III',
      ageRange: '8-12 ani (fete)',
      schedule: '2x săptămână\nMarți + Joi 19:00 - 20:00',
      price: 350,
      active: true,
      order: 6,
    },
    {
      name: 'AS Gold',
      ageRange: '7-10 ani (fete)',
      schedule: '2x săptămână\nLuni + Vineri\nOra: 18:00 - 20:00',
      price: 450,
      active: true,
      order: 7,
    },
    {
      name: 'Mini Gym',
      ageRange: '2-4 ani (fete)',
      schedule: 'Sâmbătă\nOra: 10:00 - 11:00\nPrezența unui părinte este obligatorie',
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
