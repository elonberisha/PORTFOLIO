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

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const categories = [
  ['AI Products', 'ai-products', 1],
  ['RAG', 'rag', 2],
  ['Developer Tools', 'developer-tools', 3],
  ['SaaS', 'saas', 4],
  ['Full Stack', 'full-stack', 5],
  ['Backend', 'backend', 6],
  ['API', 'api', 7],
  ['Business Website', 'business-website', 8],
  ['CMS', 'cms', 9],
  ['SEO', 'seo', 10],
  ['Frontend', 'frontend', 11],
  ['Education', 'education', 12],
  ['Course Management', 'course-management', 13],
  ['Dashboard', 'dashboard', 14],
  ['Payments', 'payments', 15],
  ['Business Tools', 'business-tools', 16],
  ['PWA', 'pwa', 17],
  ['Payroll', 'payroll', 18],
  ['Mobile App', 'mobile-app', 19],
  ['Kotlin', 'kotlin', 20],
  ['Prototype', 'prototype', 21],
  ['Software Studio', 'software-studio', 22],
  ['Brand Website', 'brand-website', 23],
  ['Design System', 'design-system', 24],
  ['Component Library', 'component-library', 25],
  ['Tools', 'tools', 26],
  ['QR / Utility', 'qr-utility', 27],
  ['Civic / Public Info', 'civic-public-info', 28],
  ['Scheduling', 'scheduling', 29],
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
    categories: ['ai-products', 'saas', 'full-stack', 'rag', 'developer-tools'],
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
    categories: ['ai-products', 'civic-public-info', 'education', 'full-stack', 'cms'],
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
    categories: ['full-stack', 'saas', 'scheduling', 'pwa', 'business-tools'],
  },
  {
    _id: 'project-employy',
    title: 'Employy',
    description:
      'Mobile-first employee management PWA for sectors, workers, daily work hours, payroll totals, reports, admin approvals, and audit logs.',
    techTag: 'PHP - MYSQL - PWA',
    year: 2026,
    url: 'https://employee.elonberisha.com',
    order: 4,
    categories: ['business-tools', 'full-stack', 'pwa', 'dashboard', 'payroll'],
  },
  {
    _id: 'project-devycore',
    title: 'DevyCore',
    description:
      'Animated software-studio website with GSAP/Lenis/Three.js frontend, Express backend, admin-managed projects, uploads, contact emails, roles, and CSP hardening.',
    techTag: 'VITE - EXPRESS - THREE.JS',
    year: 2026,
    url: 'https://devycore.com',
    order: 5,
    categories: ['brand-website', 'software-studio', 'full-stack', 'cms', 'frontend'],
  },
  {
    _id: 'project-qrcore',
    title: 'QrCore',
    description:
      'Production-minded .NET QR generation API with custom PNG rendering, SQLite history, JWT-protected management endpoints, Swagger docs, logo support, image-upload QR flows, and secret-hygiene documentation.',
    techTag: '.NET - SQLITE - JWT',
    year: 2026,
    url: 'https://qrcore.elonberisha.com',
    order: 6,
    categories: ['backend', 'api', 'tools', 'full-stack', 'qr-utility'],
  },
  {
    _id: 'project-bts-course-management',
    title: 'BTS Course Management',
    description:
      'Secure course-management dashboard for students, professors, classes, invoices, payments, salaries, permissions, email 2FA, PIN approvals, and audit logs.',
    techTag: 'PHP - MYSQL - 2FA',
    year: 2026,
    url: 'https://britishlschool.online',
    order: 7,
    categories: ['education', 'course-management', 'full-stack', 'dashboard', 'payments'],
  },
  {
    _id: 'project-ab-bau-fliesen',
    title: 'AB Bau Fliesen',
    description:
      'German construction/tile business website with SEO schema, legal pages, dynamic PHP APIs, MySQL CMS admin, catalogs, gallery, reviews, partners, and contact flow.',
    techTag: 'PHP - MYSQL - TAILWIND',
    year: 2026,
    url: 'https://ab-bau-fliesen.de',
    order: 8,
    categories: ['business-website', 'cms', 'seo', 'full-stack', 'frontend'],
  },
  {
    _id: 'project-duraku-beschichtung',
    title: 'Duraku Beschichtung',
    description:
      'Bilingual German/Albanian business website with dynamic gallery/services content, PHP admin APIs, uploads, SMTP contact form, SEO schema, 2FA, and admin subdomain setup.',
    techTag: 'PHP - CUSTOM JS - SEO',
    year: 2026,
    url: 'https://durakubeschichtung.de',
    order: 9,
    categories: ['business-website', 'cms', 'seo', 'full-stack', 'frontend'],
  },
  {
    _id: 'project-morina-baustoffe',
    title: 'Morina Baustoffe',
    description:
      'Multilingual construction-materials website with product catalogs, admin-managed content, GSAP animations, SMTP contact forms, and hardened PHP admin workflows.',
    techTag: 'PHP - GSAP - PHPMailer',
    year: 2026,
    url: 'https://morinabaustoffe.com',
    order: 10,
    categories: ['business-website', 'cms', 'seo', 'full-stack', 'frontend'],
  },
  {
    _id: 'project-unify',
    title: 'Unify',
    description:
      'Figma-driven Next.js component library with 100+ reusable UI, public, dashboard, admin, auth, layout, and icon components for a campaign platform.',
    techTag: 'NEXT.JS - TYPESCRIPT - RADIX',
    year: 2026,
    order: 11,
    categories: ['frontend', 'design-system', 'component-library', 'saas', 'dashboard'],
  },
  {
    _id: 'project-eduflow',
    title: 'EduFlow',
    description:
      'Kotlin Android school-management prototype with student/professor dashboards, Room database, classes, schedules, grades, invoices, notifications, and biometric login.',
    techTag: 'KOTLIN - COMPOSE - ROOM',
    year: 2026,
    order: 12,
    categories: ['mobile-app', 'education', 'kotlin', 'prototype'],
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
    ...(project.url ? { url: project.url } : {}),
    order: project.order,
    categories: project.categories.map(ref),
  })
}

const staleTendaIds = await client.fetch(
  `*[_type == "project" && (lower(title) match "tenda*" || url match "*tendaenisi.in*")]._id`,
)

for (const id of staleTendaIds) {
  await client.delete(id)
}

const uploaded = await client.fetch(
  `*[_type == "project" && _id in $ids] | order(order asc) {title, techTag, year, url}`,
  { ids: projects.map((project) => project._id) },
)

console.log(JSON.stringify({ uploaded: uploaded.length, removedTenda: staleTendaIds.length, projects: uploaded }, null, 2))
