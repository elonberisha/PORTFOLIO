import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return [
    {
      url: 'https://elonberisha.com',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://elonberisha.com/llms.txt',
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
  ]
}
