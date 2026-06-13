import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve('.env.local')

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const separator = trimmed.indexOf('=')
    if (separator === -1) continue
    process.env[trimmed.slice(0, separator).trim()] ??= trimmed.slice(separator + 1).trim()
  }
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  token: process.env.SANITY_API_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const settingsPatch = {
  aboutFacts: [
    { _key: 'location', label: 'Location', value: 'Prishtine, Kosovo' },
    { _key: 'university', label: 'University', value: 'AAB - CS, Programming - 2024-2027' },
    { _key: 'focus', label: 'Focus', value: 'Backend - APIs - Databases - DevOps' },
    { _key: 'status', label: 'Status', value: 'Open for internships - remote / hybrid' },
    { _key: 'team', label: 'Team', value: 'Devycore team' },
  ],
  certificationsAllLabel: 'All',
  projectsAllLabel: 'All',
  projectsFeaturedLabel: 'Selected work',
  projectsStackLabel: 'Stack',
  projectsYearLabel: 'Year',
  projectsTypeLabel: 'Type',
  projectsFallbackTypeLabel: 'Project',
  certificationsPreviewLabel: 'Preview',
  certificationsVerifyLabel: 'Verify',
  certificationsVerifiedLabel: 'Verified',
  certificationsInProgressLabel: 'In Progress',
  certificationsIdLabel: 'ID',
  certificationsYearLabel: 'Year',
  certificationsModalLabel: 'Certificate Preview',
  certificationsOpenLabel: 'Open',
  certificationsCloseLabel: 'Close certificate preview',
  footerClockLabel: 'Prishtine',
  footerTimeZone: 'Europe/Belgrade',
}

const socialLabels = {
  linkedin: 'LinkedIn',
  github: 'GitHub',
  upwork: 'Upwork',
  fiverr: 'Fiverr',
  x: 'X',
  telegram: 'Telegram',
  facebook: 'Facebook',
  instagram: 'Instagram',
}

const projectCategories = [
  ['Backend', 'backend', 1],
  ['Frontend', 'frontend', 2],
  ['Full Stack', 'full-stack', 3],
  ['AI / Automation', 'ai-automation', 4],
  ['Design Systems', 'design-systems', 5],
  ['DevOps', 'devops', 6],
  ['SaaS', 'saas', 7],
  ['Education', 'education', 8],
]

await client.patch('settings').setIfMissing(settingsPatch).commit()

const socialLinks = await client.fetch('*[_type == "socialLink"]{_id, network, label}')

for (const link of socialLinks) {
  if (!link.label) {
    await client.patch(link._id).set({ label: socialLabels[link.network] ?? link.network }).commit()
  }
}

for (const [title, slug, order] of projectCategories) {
  await client.createIfNotExists({
    _id: `projectCategory-${slug}`,
    _type: 'projectCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order,
  })
}

console.log('CMS dynamic labels ready.')
