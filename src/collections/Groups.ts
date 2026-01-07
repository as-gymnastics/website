import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Groups: CollectionConfig = {
  slug: 'groups',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'ageRange', 'active', 'order'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nume Grupă',
    },
    {
      name: 'gender',
      type: 'text',
      label: 'Gen',
      admin: {
        description: 'Ex: "fete", "băieți" sau "mixt"',
      },
    },
    {
      name: 'ageRange',
      type: 'text',
      required: true,
      label: 'Vârstă',
      admin: {
        description: 'Ex: "2-3", "4-6"',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descriere',
    },
    {
      name: 'scheduleDays',
      type: 'select',
      label: 'Zile Antrenament',
      required: true,
      hasMany: true,
      options: [
        { label: 'Luni', value: 'luni' },
        { label: 'Marți', value: 'marti' },
        { label: 'Miercuri', value: 'miercuri' },
        { label: 'Joi', value: 'joi' },
        { label: 'Vineri', value: 'vineri' },
        { label: 'Sâmbătă', value: 'sambata' },
        { label: 'Duminică', value: 'duminica' },
      ],
      admin: {
        description: 'Selectează zilele în care are loc antrenamentul',
      },
    },
    {
      name: 'startTime',
      type: 'text',
      label: 'Ora Început',
      required: true,
      admin: {
        description: 'Format: HH:mm (ex: 16:30)',
        placeholder: '16:30',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!timeRegex.test(value)) {
          return 'Formatul trebuie să fie HH:mm (ex: 16:30)'
        }
        return true
      },
    },
    {
      name: 'endTime',
      type: 'text',
      label: 'Ora Sfârșit',
      required: true,
      admin: {
        description: 'Format: HH:mm (ex: 18:00)',
        placeholder: '18:00',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return true
        const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/
        if (!timeRegex.test(value)) {
          return 'Formatul trebuie să fie HH:mm (ex: 18:00)'
        }
        return true
      },
    },
    {
      name: 'additionalInfo',
      type: 'textarea',
      label: 'Informații Adiționale',
      admin: {
        description: 'Ex: "Prezența unui părinte este obligatorie"',
      },
    },
    {
      name: 'price',
      type: 'number',
      label: 'Preț (RON/lună)',
      admin: {
        description: 'Opțional',
      },
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Activ',
      defaultValue: true,
      admin: {
        description: 'Doar grupele active vor fi afișate pe site',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Ordine Afișare',
      defaultValue: 0,
      admin: {
        description: 'Număr mai mic = afișare mai sus',
      },
    },
  ],
  timestamps: true,
}
