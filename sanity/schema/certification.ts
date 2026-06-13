import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'certification',
  title: 'Certification',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: r => r.required() }),
    defineField({ name: 'seal', title: 'Seal (2–3 chars)', type: 'string', description: 'e.g. JV, SQL, ☁, EN' }),
    defineField({ name: 'issuer', title: 'Issuer + Year', type: 'string', description: 'e.g. Oracle · 2025' }),
    defineField({ name: 'year', title: 'Year', type: 'number' }),
    defineField({
      name: 'tag',
      title: 'Category',
      type: 'string',
      options: { list: ['backend', 'cloud', 'lang', 'other'], layout: 'radio' },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'certificationCategory' }],
      description: 'Use this dynamic category. The old radio tag can stay as fallback for older entries.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: { list: ['verified', 'in-progress'], layout: 'radio' },
      initialValue: 'verified',
    }),
    defineField({ name: 'certId', title: 'Certificate ID', type: 'string', description: 'Displayed as short ID text' }),
    defineField({ name: 'url', title: 'Verify URL', type: 'url' }),
    defineField({
      name: 'pdf',
      title: 'Certificate PDF',
      type: 'file',
      description: 'Upload the certificate PDF. It will be available as an in-page preview on the portfolio.',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'media',
      title: 'Certificate Media',
      type: 'file',
      description: 'Upload a PDF or image. Clicking the certificate card opens this media as a preview.',
      options: { accept: 'application/pdf,image/*' },
    }),
    defineField({
      name: 'previewImage',
      title: 'Preview Image',
      type: 'image',
      description: 'Optional image preview for certificates. Used when no PDF/media file is uploaded, or as a visual fallback.',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'issuer' },
  },
})
