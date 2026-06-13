import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certificationCategory',
  title: 'Certification Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: r => r.required(),
    }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower = appears first' }),
  ],
  orderings: [
    { title: 'Order (asc)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
