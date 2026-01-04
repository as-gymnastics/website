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
      name: 'ageRange',
      type: 'text',
      required: true,
      label: 'Vârstă',
      admin: {
        description: 'Ex: "2-3 ani", "4-6 ani"',
      },
    },
    {
      name: 'description',
      type: 'richText',
      label: 'Descriere',
    },
    {
      name: 'schedule',
      type: 'textarea',
      label: 'Program',
      admin: {
        description: 'Zilele și orele de antrenament',
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
