import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'

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
  timestamps: true,
}
