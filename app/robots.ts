import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/studio/', '/resume'] },
    ],
    sitemap: 'https://elonberisha.com/sitemap.xml',
  }
}
