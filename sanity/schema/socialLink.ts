import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'network',
      title: 'Icon Key',
      type: 'string',
      description: 'Optional icon key, e.g. linkedin, github, upwork, fiverr, x, telegram, facebook, instagram.',
      validation: r => r.required(),
    }),
    defineField({ name: 'label', title: 'Display Label', type: 'string' }),
    defineField({ name: 'url', title: 'URL', type: 'url', validation: r => r.required() }),
    defineField({ name: 'order', title: 'Display Order', type: 'number' }),
  ],
  preview: {
    select: { title: 'network', subtitle: 'url' },
  },
})
