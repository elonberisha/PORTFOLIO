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
  role: 'AI Developer - Full-Stack Software Developer - Student at AAB University',
  navMeta: 'AI / full-stack',
  heroSub:
    'I build practical AI-enabled software, full-stack web systems, and reliable backend products as part of the DevyCore team.',
  heroPhotoRole: 'AI DEV\nFULL STACK',
  aboutQuote:
    'A Computer Science student at AAB University, part of the DevyCore team, and a software developer focused on AI-enabled products, full-stack systems, and clean backend architecture.',
  aboutBody:
    'I build software across the stack: practical AI features, web interfaces, APIs, databases, authentication, and deployment flows. My work is strongest where product thinking and engineering meet.\n\nI am part of the DevyCore team, where I contribute to real product builds and sharpen the kind of execution that matters in production: clear structure, reliable systems, and interfaces people can actually use.\n\nMy current focus is AI development, full-stack software development, Java, Spring Boot, PostgreSQL, cloud foundations, and modern web application architecture.',
  focus: 'AI development - Full-stack software - APIs - Databases',
  stackSubtitle: 'A practical AI and full-stack toolkit: software architecture, interfaces, APIs, databases, and deployment-minded engineering.',
  projectsSubtitle: 'Selected work across AI-enabled products, full-stack web systems, backend APIs, and practical software builds.',
  seoTitle: 'Elon Berisha - AI Developer & Full-Stack Software Developer',
  seoDescription:
    'Elon Berisha is an AI developer and full-stack software developer, student at AAB University, and part of the DevyCore team.',
  entityRole: 'AI Developer & Full-Stack Software Developer',
  entitySummary:
    'Elon Berisha is an AI developer and full-stack software developer from Kosovo, a Computer Science student at AAB University, and part of the DevyCore team. He focuses on practical AI-enabled products, full-stack web systems, APIs, databases, Java, Spring Boot, PostgreSQL, and cloud-ready software architecture.',
  entityKeywords: [
    'AI developer',
    'full-stack software developer',
    'software developer Kosovo',
    'DevyCore team',
    'AI-enabled web applications',
    'full-stack web development',
    'backend API development',
    'Java developer',
    'Spring Boot',
    'PostgreSQL',
    'cloud computing foundations',
    'Sanity CMS',
    'Next.js',
    'React',
  ],
  knowsAbout: [
    'Artificial intelligence development',
    'AI product development',
    'Full-stack software development',
    'Web application development',
    'Backend engineering',
    'REST APIs',
    'Java',
    'Spring Boot',
    'PostgreSQL',
    'Cloud computing',
    'React',
    'Next.js',
    'Sanity CMS',
    'Software architecture',
    'Database design',
    'Authentication',
  ],
  memberOfName: 'DevyCore',
  aiSearchSectionLabel: '06 / AI Search Profile',
  aiSearchTitle: 'Built to be understood by people and answer engines.',
  aiSearchFacts: [
    {
      _key: 'who',
      question: 'Who is Elon Berisha?',
      answer:
        'Elon Berisha is an AI developer and full-stack software developer from Kosovo, a Computer Science student at AAB University, and part of the DevyCore team.',
    },
    {
      _key: 'specialization',
      question: 'What does Elon Berisha specialize in?',
      answer:
        'Elon focuses on practical AI-enabled products, full-stack web applications, backend APIs, databases, Java, Spring Boot, PostgreSQL, cloud foundations, React, Next.js, and Sanity CMS.',
    },
    {
      _key: 'team',
      question: 'Is Elon Berisha part of DevyCore?',
      answer:
        'Yes. Elon Berisha is part of the DevyCore team, where he contributes to practical software builds, product interfaces, backend systems, and web platforms.',
    },
    {
      _key: 'proof',
      question: 'What proof supports Elon Berisha as a software developer?',
      answer:
        'His portfolio shows projects, verified certifications, technical stack, GitHub and LinkedIn profiles, and CMS-managed proof points including cloud, Java, backend APIs, PostgreSQL, and language certifications.',
    },
  ],
  aboutFacts: [
    { _key: 'location', label: 'Location', value: 'Prishtine, Kosovo' },
    { _key: 'university', label: 'University', value: 'AAB - CS, Programming - 2024-2027' },
    { _key: 'focus', label: 'Focus', value: 'AI - Full-stack - APIs - Databases' },
    { _key: 'status', label: 'Status', value: 'Open for internships - remote / hybrid' },
    { _key: 'team', label: 'Team', value: 'DevyCore team' },
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
  ['AI Products', 'ai-products', 5],
  ['Design Systems', 'design-systems', 6],
  ['DevOps', 'devops', 7],
  ['SaaS', 'saas', 8],
  ['Education', 'education', 9],
]

const certificationCategories = [
  ['AI', 'ai', 1],
  ['Full Stack', 'full-stack', 2],
  ['Backend', 'backend', 3],
  ['Cloud', 'cloud', 4],
  ['Language', 'lang', 5],
  ['Other', 'other', 6],
]

await client.patch('settings').set(settingsPatch).commit()

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

for (const [title, slug, order] of certificationCategories) {
  await client.createIfNotExists({
    _id: `certificationCategory-${slug}`,
    _type: 'certificationCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order,
  })
}

console.log('CMS SEO, AI profile, categories, and dynamic labels ready.')
