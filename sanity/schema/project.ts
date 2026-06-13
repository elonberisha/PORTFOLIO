import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 2 }),
    defineField({ name: 'techTag', title: 'Tech Tag', type: 'string', description: 'e.g. SPRING BOOT · 2025' }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Create categories in Project Categories, then attach as many as needed here.',
      of: [{ type: 'reference', to: [{ type: 'projectCategory' }] }],
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Upload a project preview image used on the portfolio list.',
      options: { hotspot: true },
    }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({ name: 'url', title: 'Project URL', type: 'url' }),
    defineField({ name: 'order', title: 'Display Order', type: 'number', description: 'Lower = appears first' }),
  ],
  orderings: [
    { title: 'Order (asc)', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'year' },
    prepare({ title, subtitle }) {
      return { title, subtitle: String(subtitle) }
    },
  },
})
