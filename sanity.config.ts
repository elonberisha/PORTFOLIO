'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './sanity'

export default defineConfig({
  name: 'elon-portfolio',
  title: 'Elon Portfolio CMS',
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem().title('Personal Settings').child(
              S.document().schemaType('settings').documentId('settings')
            ),
            S.listItem().title('Resume').child(
              S.document().schemaType('resume').documentId('resume')
            ),
            S.divider(),
            S.listItem().title('Projects').child(S.documentTypeList('project')),
            S.listItem().title('Project Categories').child(S.documentTypeList('projectCategory')),
            S.listItem().title('Certifications').child(S.documentTypeList('certification')),
            S.listItem().title('Certification Categories').child(S.documentTypeList('certificationCategory')),
            S.listItem().title('Stack Groups').child(S.documentTypeList('stackGroup')),
            S.listItem().title('Social Links').child(S.documentTypeList('socialLink')),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
})
