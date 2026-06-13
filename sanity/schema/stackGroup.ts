import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'stackGroup',
  title: 'Stack Group',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Group Name', type: 'string', description: 'e.g. Languages, Backend & APIs' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
    defineField({
      name: 'items',
      title: 'Skills',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'name', title: 'Skill Name', type: 'string' }),
          defineField({ name: 'years', title: 'Experience', type: 'string', description: 'e.g. 3 years' }),
        ],
        preview: { select: { title: 'name', subtitle: 'years' } },
      }],
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'order' },
    prepare({ title, subtitle }) {
      return { title, subtitle: `Order: ${subtitle}` }
    },
  },
})
