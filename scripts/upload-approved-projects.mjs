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

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_WRITE_TOKEN) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}

const categories = [
  ['AI & RAG Platforms', 'ai-rag-platforms', 1],
  ['SaaS Platforms', 'saas-platforms', 2],
  ['Education Systems', 'education-systems', 3],
  ['Developer Tools', 'developer-tools', 4],
]

const ref = (slug) => ({
  _key: slug,
  _type: 'reference',
  _ref: `projectCategory-${slug}`,
})

const projects = [
  {
    _id: 'project-1keyai',
    title: '1KeyAI',
    description:
      'API-first RAG platform where developers upload PDFs or URLs, get a pk_xxx key, and add document-grounded AI chat through FastAPI, Supabase, embeddings, and Next.js.',
    techTag: 'FASTAPI - NEXT.JS - RAG',
    year: 2026,
    url: 'https://www.1keyai.org',
    order: 1,
    categories: ['ai-rag-platforms', 'developer-tools'],
  },
  {
    _id: 'project-eu-guide-ks',
    title: 'EU Guide KS',
    description:
      "Civic AI platform for Kosovo's EU integration, with multilingual content, Supabase CMS, RAG chat, document ingestion, and voice assistant support.",
    techTag: 'NEXT.JS - RAG - SUPABASE',
    year: 2026,
    url: 'https://www.euguide-ks.info',
    order: 2,
    categories: ['ai-rag-platforms', 'education-systems'],
  },
  {
    _id: 'project-schedycore',
    title: 'SchedyCore',
    description:
      'Full-stack scheduling and operations platform with public booking, admin workflows, PostgreSQL APIs, trusted-device auth, real-time updates, and PWA/mobile support.',
    techTag: 'REACT - NODE - POSTGRES',
    year: 2026,
    url: 'https://schedycore.elonberisha.com',
    order: 3,
    categories: ['saas-platforms'],
  },
  {
    _id: 'project-bts-course-management',
    title: 'BTS Course Management',
    description:
      'Secure course-management dashboard for students, professors, classes, invoices, payments, salaries, permissions, email 2FA, PIN approvals, and audit logs.',
    techTag: 'PHP - MYSQL - 2FA',
    year: 2025,
    url: 'https://britishlschool.online',
    order: 4,
    categories: ['education-systems', 'saas-platforms'],
  },
]

for (const [title, slug, order] of categories) {
  await client.createOrReplace({
    _id: `projectCategory-${slug}`,
    _type: 'projectCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order,
  })
}

for (const project of projects) {
  await client.createOrReplace({
    _id: project._id,
    _type: 'project',
    title: project.title,
    description: project.description,
    techTag: project.techTag,
    year: project.year,
    url: project.url,
    order: project.order,
    categories: project.categories.map(ref),
  })
}

const keepProjectIds = projects.map((project) => project._id)
const staleProjects = await client.fetch('*[_type == "project" && !(_id in $keepProjectIds)]{_id,title}', {
  keepProjectIds,
})
for (const project of staleProjects) {
  await client.delete(project._id)
}

const keepCategoryIds = categories.map(([, slug]) => `projectCategory-${slug}`)
const staleCategories = await client.fetch(
  '*[_type == "projectCategory" && !(_id in $keepCategoryIds)]{_id,title}',
  { keepCategoryIds },
)
for (const category of staleCategories) {
  await client.delete(category._id)
}

const remaining = await client.fetch('*[_type == "project"] | order(order asc) {title, url, techTag, year}')
console.log(JSON.stringify({ uploaded: remaining.length, removedProjects: staleProjects.length, removedCategories: staleCategories.length, projects: remaining }, null, 2))
