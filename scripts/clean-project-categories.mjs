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
  ['Education Systems', 'education-systems', 3],
  ['Developer Tools', 'developer-tools', 4],
]

const projectCategories = {
  'project-1keyai': ['ai-rag-platforms', 'developer-tools'],
  'project-eu-guide-ks': ['ai-rag-platforms', 'education-systems'],
  'project-schedycore': ['saas-platforms'],
  'project-bts-course-management': ['education-systems', 'saas-platforms'],
}

const projectOrder = {
  'project-1keyai': 1,
  'project-eu-guide-ks': 2,
  'project-schedycore': 3,
  'project-bts-course-management': 4,
}

const projectUrls = {
  'project-1keyai': 'https://1keyai.org',
  'project-eu-guide-ks': 'https://euguide-ks.info',
  'project-schedycore': 'https://arberardita.com',
  'project-bts-course-management': 'https://britishlschool.online',
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
  const exists = await client.fetch('defined(*[_id == $id][0]._id)', { id })
  if (exists) {
    await client.patch(id).set({ categories: slugs.map(ref), order: projectOrder[id], url: projectUrls[id] }).commit()
  }
}

const keepProjectIds = Object.keys(projectCategories)
const staleProjects = await client.fetch('*[_type == "project" && !(_id in $keepProjectIds)]{_id, title}', {
  keepProjectIds,
})

for (const project of staleProjects) {
  await client.delete(project._id)
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

console.log(
  JSON.stringify(
    {
      kept: current.length,
      removedCategories: stale.length,
      removedProjects: staleProjects.length,
      categories: current,
      staleCategories: stale,
      staleProjects,
    },
    null,
    2,
  ),
)
