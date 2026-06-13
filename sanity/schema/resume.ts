import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({ name: 'toolbarLabel', title: 'Toolbar Label', type: 'string' }),
    defineField({ name: 'printButtonLabel', title: 'Print Button Label', type: 'string' }),
    defineField({ name: 'homeButtonLabel', title: 'Home Button Label', type: 'string' }),
    defineField({ name: 'summary', title: 'Profile Summary', type: 'text', rows: 4 }),
    defineField({
      name: 'facts',
      title: 'Sidebar Facts',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'value', title: 'Value', type: 'text', rows: 2 }),
          ],
        },
      ],
    }),
    defineField({ name: 'projectsSectionLabel', title: 'Projects Section Label', type: 'string' }),
    defineField({ name: 'stackSectionLabel', title: 'Stack Section Label', type: 'string' }),
    defineField({ name: 'certificationsSectionLabel', title: 'Certifications Section Label', type: 'string' }),
    defineField({
      name: 'customSections',
      title: 'Custom Resume Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'title', title: 'Section Title', type: 'string' }),
            defineField({
              name: 'entries',
              title: 'Entries',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'title', title: 'Title', type: 'string' }),
                    defineField({ name: 'meta', title: 'Meta / Place', type: 'string' }),
                    defineField({ name: 'date', title: 'Date', type: 'string' }),
                    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'showProjects',
      title: 'Show Projects From CMS',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showStack',
      title: 'Show Stack From CMS',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'showCertifications',
      title: 'Show Certifications From CMS',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({ name: 'footerLeft', title: 'Footer Left Text', type: 'string' }),
    defineField({ name: 'footerRight', title: 'Footer Right Text', type: 'string' }),
  ],
  preview: {
    prepare: () => ({ title: 'Resume' }),
  },
})
