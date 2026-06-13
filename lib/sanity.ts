import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const isValid = !!projectId && /^[a-z0-9-]+$/.test(projectId)

export const client = isValid
  ? createClient({
      projectId: projectId!,
      dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
      apiVersion: '2024-01-01',
      useCdn: false,
    })
  : null

const builder = isValid && client ? imageUrlBuilder(client) : null

export function urlFor(source: SanityImageSource) {
  if (!builder) return null
  return builder.image(source)
}
