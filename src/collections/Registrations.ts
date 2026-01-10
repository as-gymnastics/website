import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { sendWhatsAppMessage } from '../utilities/whatsapp'

export const Registrations: CollectionConfig = {
  slug: 'registrations',
  access: {
    create: () => true, // Allow public registration submissions
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['parentName', 'childName', 'email', 'status', 'createdAt'],
    useAsTitle: 'parentName',
  },
  fields: [
    {
      name: 'parentName',
      type: 'text',
      required: true,
      label: 'Nume Părinte',
    },
    {
      name: 'email',
      type: 'email',
      required: true,
      label: 'Email',
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
      label: 'Telefon',
    },
    {
      name: 'childName',
      type: 'text',
      required: true,
      label: 'Nume Copil',
    },
    {
      name: 'childAge',
      type: 'number',
      required: true,
      label: 'Vârsta Copilului',
      min: 1,
      max: 18,
    },
    {
      name: 'intention',
      type: 'select',
      required: true,
      label: 'Intenție Înscriere',
      options: [
        {
          label: 'Competiție',
          value: 'competition',
        },
        {
          label: 'Recreere',
          value: 'recreation',
        },
        {
          label: 'Fitness',
          value: 'fitness',
        },
        {
          label: 'Altele',
          value: 'other',
        },
      ],
    },
    {
      name: 'program',
      type: 'relationship',
      relationTo: 'groups',
      required: true,
      label: 'Program Dorit',
      admin: {
        description: 'Selectați grupa de antrenament dorită',
      },
    },
    {
      name: 'hasHealthProblems',
      type: 'checkbox',
      label: 'Probleme de Sănătate',
      defaultValue: false,
    },
    {
      name: 'healthProblemsDetails',
      type: 'textarea',
      label: 'Detalii Probleme de Sănătate',
      admin: {
        condition: (data) => data.hasHealthProblems === true,
        description: 'Vă rugăm să descrieți orice probleme de sănătate relevante',
      },
    },
    {
      name: 'referralSource',
      type: 'text',
      label: 'De unde ați auzit despre noi?',
      admin: {
        description: 'Ex: Facebook, Google, Recomandare prieten, etc.',
      },
    },
    {
      name: 'firstTrainingDate',
      type: 'date',
      label: 'Data Primului Antrenament',
      admin: {
        description: 'Data dorită pentru primul antrenament',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'pending',
      options: [
        {
          label: 'În Așteptare',
          value: 'pending',
        },
        {
          label: 'Contactat',
          value: 'contacted',
        },
        {
          label: 'Înscris',
          value: 'enrolled',
        },
        {
          label: 'Anulat',
          value: 'cancelled',
        },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation === 'create') {
          // Send Email
          try {
            await req.payload.sendEmail({
              to: doc.email,
              subject: 'Bine ai venit la AS Gymnastics!',
              html: `
                <h1>Bună ${doc.parentName},</h1>
                <p>Îți mulțumim pentru înregistrarea la AS Gymnastics.</p>
                <p>Am primit solicitarea ta pentru ${doc.childName} și te vom contacta în curând pentru confirmare.</p>
                <br>
                <p>Cu drag,</p>
                <p>Echipa AS Gymnastics</p>
              `,
            })
          } catch (err) {
            req.payload.logger.error({ err }, 'Error sending registration email')
          }

          // Send WhatsApp
          try {
            const message = `Bun venit la AS-Gymnastics!

Ne bucurăm enorm că v-ați alăturat comunității noastre! Suntem gata de acțiune și abia așteptăm prima sesiune de antrenament.

Pentru ca totul să meargă perfect, vă rugăm să accesați link-ul de mai jos. Acolo veți găsi toate detaliile despre prima vizită: ce trebuie să aveți în rucsac, pașii de urmat și programul complet.

🔗 Vezi detalii prima vizită: https://as-gymnastics.ro/informatii-prim-antrenament

Ne vedem la antrenament!`
            await sendWhatsAppMessage(doc.phone, message)
          } catch (err) {
            req.payload.logger.error({ err }, 'Error sending registration WhatsApp message')
          }
        }
      },
    ],
  },
  timestamps: true,
}
