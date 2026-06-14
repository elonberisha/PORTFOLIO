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

const keepCategories = [
  ['AI & RAG Platforms', 'ai-rag-platforms', 1],
  ['SaaS Platforms', 'saas-platforms', 2],
  ['Social Impact Platforms', 'social-impact-platforms', 3],
  ['Client Business Websites', 'client-business-websites', 4],
  ['Backend APIs & Utilities', 'backend-apis-utilities', 5],
  ['Education Systems', 'education-systems', 6],
  ['Developer Tools', 'developer-tools', 7],
  ['Mobile Apps', 'mobile-apps', 8],
]

const projectCategories = {
  'project-1keyai': ['ai-rag-platforms', 'developer-tools'],
  'project-eu-guide-ks': ['ai-rag-platforms', 'education-systems'],
  'project-schedycore': ['saas-platforms'],
  'project-qrcore': ['backend-apis-utilities', 'developer-tools'],
  'project-employy': ['saas-platforms'],
  'project-bts-course-management': ['education-systems', 'saas-platforms'],
  'project-devycore': ['client-business-websites'],
  'project-ab-bau-fliesen': ['client-business-websites'],
  'project-duraku-beschichtung': ['client-business-websites'],
  'project-morina-baustoffe': ['client-business-websites'],
  'project-unify': ['social-impact-platforms', 'saas-platforms'],
  'project-eduflow': ['mobile-apps', 'education-systems'],
  'project-floreta-berisha': ['client-business-websites'],
  'project-enisi-store': ['client-business-websites'],
}

const projectOrder = {
  'project-1keyai': 1,
  'project-eu-guide-ks': 2,
  'project-schedycore': 3,
  'project-qrcore': 4,
  'project-employy': 5,
  'project-bts-course-management': 6,
  'project-devycore': 7,
  'project-ab-bau-fliesen': 8,
  'project-duraku-beschichtung': 9,
  'project-morina-baustoffe': 10,
  'project-unify': 11,
  'project-eduflow': 12,
  'project-floreta-berisha': 13,
  'project-enisi-store': 14,
}

const ref = (slug) => ({
  _key: slug,
  _type: 'reference',
  _ref: `projectCategory-${slug}`,
})

for (const [title, slug, order] of keepCategories) {
  await client.createOrReplace({
    _id: `projectCategory-${slug}`,
    _type: 'projectCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order,
  })
}

for (const [id, slugs] of Object.entries(projectCategories)) {
  await client.patch(id).set({ categories: slugs.map(ref), order: projectOrder[id] }).commit()
}

const keepIds = keepCategories.map(([, slug]) => `projectCategory-${slug}`)
const stale = await client.fetch(
  `*[_type == "projectCategory" && !(_id in $keepIds)]{_id, title, "slug": slug.current}`,
  { keepIds },
)

for (const category of stale) {
  await client.delete(category._id)
}

const current = await client.fetch(
  `*[_type == "projectCategory"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    "usage": count(*[_type == "project" && references(^._id)])
  }`,
)

console.log(JSON.stringify({ kept: current.length, removed: stale.length, categories: current, removedCategories: stale }, null, 2))
