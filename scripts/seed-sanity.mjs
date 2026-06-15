import { createClient } from '@sanity/client'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const envPath = resolve('.env.local')

if (existsSync(envPath)) {
  const envFile = readFileSync(envPath, 'utf8')

  for (const line of envFile.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separator = trimmed.indexOf('=')
    if (separator === -1) continue

    const key = trimmed.slice(0, separator).trim()
    const value = trimmed.slice(separator + 1).trim()
    process.env[key] ??= value
  }
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'
const token = process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !token) {
  console.error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.')
  console.error('Create a Sanity token with write access, then run:')
  console.error('$env:SANITY_API_WRITE_TOKEN="your_token"; npm run seed:sanity')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const projectCategories = [
  ['Backend', 'backend'],
  ['SaaS', 'saas'],
  ['API', 'api'],
  ['Education', 'education'],
  ['Open Source', 'open-source'],
  ['Tooling', 'tooling'],
]

const certificationCategories = [
  ['Backend', 'backend'],
  ['Cloud', 'cloud'],
  ['Language', 'lang'],
]

const socialLinks = [
  ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/elon-berisha-6aa4b6371/'],
  ['github', 'GitHub', 'https://github.com/'],
  ['upwork', 'Upwork', 'https://www.upwork.com/freelancers/~01fbf66d1b7be38182?mp_source=share'],
  ['fiverr', 'Fiverr', 'https://www.fiverr.com/'],
  ['x', 'X', 'https://x.com/'],
  ['telegram', 'Telegram', 'https://telegram.org/'],
  ['facebook', 'Facebook', 'https://www.facebook.com/'],
  ['instagram', 'Instagram', 'https://www.instagram.com/elonberisha8/'],
]

const categoryRef = (slug) => ({
  _type: 'reference',
  _ref: `projectCategory-${slug}`,
  _key: slug,
})

const certCategoryRef = (slug) => ({
  _type: 'reference',
  _ref: `certificationCategory-${slug}`,
})

const documents = [
  {
    _id: 'settings',
    _type: 'settings',
    name: 'Elon Berisha',
    role: 'Backend Developer - Computer Science - AAB University',
    navMeta: 'backend',
    navResumeLabel: 'Resume',
    navLinks: [
      { _key: 'about', label: 'About', href: '#about' },
      { _key: 'stack', label: 'Stack', href: '#stack' },
      { _key: 'projects', label: 'Projects', href: '#projects' },
      { _key: 'certifications', label: 'Certifications', href: '#certs' },
      { _key: 'contact', label: 'Contact', href: '#contact' },
    ],
    heroEyebrow: 'Open for Internships - Summer 2026',
    heroSub: "I build modern digital experiences as part of the Devycore team - scalable systems, intuitive interfaces, and the technology that quietly powers them behind the scenes.",
    heroPrimaryCtaLabel: 'Download Resume',
    heroProjectsCtaLabel: 'View Projects',
    heroContactCtaLabel: 'Contact',
    heroPortraitPlaceholder: 'Upload your portrait\nin Sanity CMS -> Settings -> Portrait Photo',
    heroPhotoTag: 'ELON / 2026',
    heroPhotoLocation: 'Prishtine - KS',
    heroPhotoRole: 'BACKEND\nDEV',
    aboutSectionLabel: '01 / About',
    aboutTitle: "Hello, I'm {firstName}.",
    aboutQuote: 'A Computer Science student at AAB University in Prishtine, part of the Devycore team, and a Systems & Software Developer who finds beauty in clean queries and quiet servers.',
    aboutBody:
      'I started programming at fifteen, drawn in by the simple magic of making a computer do something. A few years and many half-finished projects later, I landed in CS at AAB - Programming department.\n\nI gravitate toward backend work: REST and GraphQL APIs, relational databases, authentication, caching, the unglamorous wiring that makes apps fast and trustworthy.\n\nI am also part of the Devycore team, where I contribute to practical product builds, web systems, and the kind of software work that needs both clean execution and steady engineering judgment.',
    location: 'Prishtine, Kosovo',
    university: 'AAB - CS, Programming - 2024-2027',
    focus: 'Backend - APIs - Databases - DevOps',
    status: 'Open for internships - remote / hybrid',
    aboutFacts: [
      { _key: 'location', label: 'Location', value: 'Prishtine, Kosovo' },
      { _key: 'university', label: 'University', value: 'AAB - CS, Programming - 2024-2027' },
      { _key: 'focus', label: 'Focus', value: 'Backend - APIs - Databases - DevOps' },
      { _key: 'status', label: 'Status', value: 'Open for internships - remote / hybrid' },
      { _key: 'team', label: 'Team', value: 'Devycore team' },
    ],
    stackSectionLabel: '02 / Tech stack',
    stackTitle: 'The tools|I trust.',
    stackSubtitle: 'A grounded backend toolkit, plus enough front-end to ship end-to-end.',
    projectsSectionLabel: '03 / Selected work',
    projectsTitle: 'Things I shipped.',
    projectsSubtitle: 'A few projects where the backend did the heavy lifting.',
    projectsAllLabel: 'All',
    projectsFeaturedLabel: 'Selected work',
    projectsStackLabel: 'Stack',
    projectsYearLabel: 'Year',
    projectsTypeLabel: 'Type',
    projectsFallbackTypeLabel: 'Project',
    certificationsSectionLabel: '04 / Certifications',
    certificationsTitle: 'Paper trail.',
    certificationsAllLabel: 'All',
    certificationsPreviewLabel: 'Preview',
    certificationsVerifyLabel: 'Verify',
    certificationsVerifiedLabel: 'Verified',
    certificationsInProgressLabel: 'In Progress',
    certificationsIdLabel: 'ID',
    certificationsYearLabel: 'Year',
    certificationsModalLabel: 'Certificate Preview',
    certificationsOpenLabel: 'Open',
    certificationsCloseLabel: 'Close certificate preview',
    contactSectionLabel: '05 / Get in touch',
    contactTitle: "Let's talk.",
    contactIntro: "I'm available for internships, junior backend roles, and freelance gigs starting summer 2026. Remote or hybrid - anywhere on the map.",
    contactEmailButtonLabel: 'Email me',
    contactCvButtonLabel: 'CV.pdf',
    contactLinks: [
      { _key: 'email', label: 'Email', value: 'elon@example.com', href: 'mailto:elon@example.com' },
      { _key: 'github', label: 'GitHub', value: '@elonberisha', href: 'https://github.com/' },
      { _key: 'linkedin', label: 'LinkedIn', value: 'in/elon-berisha', href: 'https://www.linkedin.com/in/elon-berisha-6aa4b6371/' },
      { _key: 'phone', label: 'Phone', value: '+383 44 000 000', href: 'tel:+38344000000' },
    ],
    email: 'elon@example.com',
    phone: '+383 44 000 000',
    footerLeft: '2026 Elon Berisha',
    footerRight: 'Built in Prishtine',
    footerClockLabel: 'Prishtine',
    footerTimeZone: 'Europe/Belgrade',
  },
  {
    _id: 'resume',
    _type: 'resume',
    toolbarLabel: 'Resume',
    downloadButtonLabel: 'Download PDF',
    printButtonLabel: 'Print / PDF',
    homeButtonLabel: 'Portfolio',
    summary:
      'Backend-leaning Computer Science student and Devycore team member focused on APIs, databases, authentication, and the quiet infrastructure that makes products reliable.',
    facts: [
      { _key: 'location', label: 'Location', value: 'Prishtine, Kosovo' },
      { _key: 'focus', label: 'Focus', value: 'Backend - APIs - Databases - DevOps' },
      { _key: 'status', label: 'Status', value: 'Open for internships - remote / hybrid' },
      { _key: 'team', label: 'Team', value: 'Devycore team' },
      { _key: 'education', label: 'Education', value: 'AAB - CS, Programming - 2024-2027' },
    ],
    customSections: [
      {
        _key: 'profile',
        title: 'Profile',
        entries: [
          {
            _key: 'backend-student',
            title: 'Backend Developer',
            meta: 'AAB University - Computer Science',
            date: '2024-2027',
            description:
              'Building practical backend projects with REST APIs, relational databases, authentication, caching, and deployment workflows.',
          },
        ],
      },
    ],
    projectsSectionLabel: 'Selected Projects',
    projectsNote: 'A compact selection from a larger project archive.',
    stackSectionLabel: 'Technical Stack',
    certificationsSectionLabel: 'Certifications',
    showProjects: true,
    showStack: true,
    showCertifications: true,
    footerLeft: '2026 Elon Berisha',
    footerRight: 'Portfolio resume - editable in Sanity CMS',
  },
  ...projectCategories.map(([title, slug], index) => ({
    _id: `projectCategory-${slug}`,
    _type: 'projectCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order: index + 1,
  })),
  ...certificationCategories.map(([title, slug], index) => ({
    _id: `certificationCategory-${slug}`,
    _type: 'certificationCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order: index + 1,
  })),
  ...socialLinks.map(([network, label, url], index) => ({
    _id: `socialLink-${network}`,
    _type: 'socialLink',
    network,
    label,
    url,
    order: index + 1,
  })),
  {
    _id: 'project-labfolio',
    _type: 'project',
    title: 'LabFolio',
    description: 'REST API + Postgres backend for an AAB student-grading dashboard. JWT auth, role-based access.',
    techTag: 'SPRING BOOT',
    categories: [categoryRef('backend'), categoryRef('education'), categoryRef('api')],
    year: 2025,
    order: 1,
  },
  {
    _id: 'project-tarifa',
    _type: 'project',
    title: 'Tarifa',
    description: 'Multi-tenant SaaS for QR-menu restaurants. Node + Postgres + Redis cache, Stripe webhooks.',
    techTag: 'NODE - SAAS',
    categories: [categoryRef('saas'), categoryRef('backend')],
    year: 2025,
    order: 2,
  },
  {
    _id: 'project-pomos-api',
    _type: 'project',
    title: 'Pomos API',
    description: 'Open-source Pomodoro tracking service. FastAPI + Postgres, OpenAPI docs, deployed via Docker.',
    techTag: 'FASTAPI',
    categories: [categoryRef('open-source'), categoryRef('api')],
    year: 2024,
    order: 3,
  },
  {
    _id: 'project-static-gen',
    _type: 'project',
    title: 'Static-Gen',
    description: 'A Node-based static site generator I built to learn the language - still powering three small websites.',
    techTag: 'NODE - CLI',
    categories: [categoryRef('tooling')],
    year: 2023,
    order: 4,
  },
  {
    _id: 'stack-languages',
    _type: 'stackGroup',
    name: 'Languages',
    order: 1,
    items: [
      { _key: 'java', name: 'Java', years: '3 years' },
      { _key: 'python', name: 'Python', years: '3 years' },
      { _key: 'typescript', name: 'JavaScript / TypeScript', years: '3 years' },
      { _key: 'dotnet', name: 'C# - .NET', years: '2 years' },
      { _key: 'sql', name: 'SQL', years: '3 years' },
    ],
  },
  {
    _id: 'stack-backend',
    _type: 'stackGroup',
    name: 'Backend & APIs',
    order: 2,
    items: [
      { _key: 'spring', name: 'Spring Boot', years: '2 years' },
      { _key: 'node', name: 'Node.js - Express', years: '2 years' },
      { _key: 'fastapi', name: 'FastAPI', years: '1 year' },
      { _key: 'rest', name: 'REST - GraphQL', years: '2 years' },
      { _key: 'auth', name: 'JWT - OAuth2', years: '1 year' },
    ],
  },
  {
    _id: 'stack-databases',
    _type: 'stackGroup',
    name: 'Databases',
    order: 3,
    items: [
      { _key: 'postgres', name: 'PostgreSQL', years: '2 years' },
      { _key: 'mysql', name: 'MySQL / MariaDB', years: '2 years' },
      { _key: 'mongo', name: 'MongoDB', years: '1 year' },
      { _key: 'redis', name: 'Redis', years: '1 year' },
      { _key: 'orm', name: 'Prisma - Hibernate', years: '1 year' },
    ],
  },
  {
    _id: 'stack-devops',
    _type: 'stackGroup',
    name: 'DevOps & Tools',
    order: 4,
    items: [
      { _key: 'docker', name: 'Docker - Compose', years: '1 year' },
      { _key: 'linux', name: 'Linux - CLI', years: '3 years' },
      { _key: 'git', name: 'Git - GitHub Actions', years: '3 years' },
      { _key: 'nginx', name: 'Nginx - Caddy', years: '1 year' },
      { _key: 'postman', name: 'Postman - curl', years: '2 years' },
    ],
  },
  {
    _id: 'cert-java',
    _type: 'certification',
    seal: 'JV',
    issuer: 'Oracle - 2025',
    year: 2025,
    title: 'Java SE - Foundations',
    tag: 'backend',
    category: certCategoryRef('backend'),
    status: 'verified',
    certId: 'oracle-jse-25',
  },
  {
    _id: 'cert-postgresql',
    _type: 'certification',
    seal: 'SQL',
    issuer: 'Coursera - 2025',
    year: 2025,
    title: 'PostgreSQL for Everybody',
    tag: 'backend',
    category: certCategoryRef('backend'),
    status: 'verified',
    certId: 'psql-25',
  },
  {
    _id: 'cert-backend-api',
    _type: 'certification',
    seal: 'N',
    issuer: 'freeCodeCamp - 2024',
    year: 2024,
    title: 'Back End Dev & APIs',
    tag: 'backend',
    category: certCategoryRef('backend'),
    status: 'verified',
    certId: 'fcc-bea-24',
  },
  {
    _id: 'cert-cloud',
    _type: 'certification',
    seal: 'CL',
    issuer: 'Google - Coursera - 2025',
    year: 2025,
    title: 'Foundations of Cloud Computing',
    tag: 'cloud',
    category: certCategoryRef('cloud'),
    status: 'verified',
    certId: 'gcc-fnd-25',
  },
  {
    _id: 'cert-english',
    _type: 'certification',
    seal: 'EN',
    issuer: 'British Council - 2024',
    year: 2024,
    title: 'IELTS - English (7.5)',
    tag: 'lang',
    category: certCategoryRef('lang'),
    status: 'verified',
    certId: 'ielts-7.5',
  },
  {
    _id: 'cert-german',
    _type: 'certification',
    seal: 'DE',
    issuer: 'Goethe-Institut - 2023',
    year: 2023,
    title: 'German B2 - Mittelstufe',
    tag: 'lang',
    category: certCategoryRef('lang'),
    status: 'verified',
    certId: 'goethe-b2',
  },
]

const cleanupTypes = [
  'project',
  'certification',
  'stackGroup',
  'resume',
  'projectCategory',
  'certificationCategory',
  'socialLink',
]

async function seed() {
  for (const type of cleanupTypes) {
    await client.delete({ query: `*[_type == "${type}"]` })
    console.log(`Cleaned ${type}`)
  }

  for (const doc of documents) {
    await client.createOrReplace(doc)
    console.log(`Seeded ${doc._type}: ${doc._id}`)
  }

  console.log('Sanity seed complete.')
}

try {
  await seed()
} catch (error) {
  const message = error?.message ?? String(error)

  if (error?.statusCode === 403 || message.includes('Insufficient permissions')) {
    console.error('Sanity rejected the token: it does not have write/update permissions.')
    console.error('Create a new API token in Sanity Manage with Editor permissions, put it in .env.local as SANITY_API_WRITE_TOKEN, then rerun:')
    console.error('npm run seed:sanity')
    process.exit(1)
  }

  throw error
}
