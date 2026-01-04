import type { CollectionConfig } from 'payload'

import { authenticated } from '../access/authenticated'
import { authenticatedOrPublished } from '../access/authenticatedOrPublished'

export const Coaches: CollectionConfig = {
  slug: 'coaches',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'title', 'active', 'order'],
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nume',
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Titlu/Calificare',
      admin: {
        description: 'Ex: "Antrenor Principal", "Antrenor Certificat"',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Biografie',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Fotografie',
      admin: {
        description: 'Opțional - se va folosi placeholder dacă nu este încărcată',
      },
    },
    {
      name: 'backgroundColor',
      type: 'select',
      label: 'Culoare Fundal',
      defaultValue: 'peach',
      options: [
        {
          label: 'Piersică',
          value: 'peach',
        },
        {
          label: 'Albastru',
          value: 'blue',
        },
        {
          label: 'Verde',
          value: 'green',
        },
        {
          label: 'Galben',
          value: 'yellow',
        },
      ],
    },
    {
      name: 'active',
      type: 'checkbox',
      label: 'Activ',
      defaultValue: true,
      admin: {
        description: 'Doar antrenorii activi vor fi afișați pe site',
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
