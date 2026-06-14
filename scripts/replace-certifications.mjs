import { createClient } from '@sanity/client'
import { createReadStream, existsSync, readFileSync } from 'node:fs'
import { basename, resolve } from 'node:path'

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
  ['AI', 'ai', 1],
  ['Full Stack', 'full-stack', 2],
  ['Backend', 'backend', 3],
  ['Cloud', 'cloud', 4],
  ['Language', 'lang', 5],
  ['Internship', 'internship', 6],
  ['Hackathon', 'hackathon', 7],
  ['Other', 'other', 8],
]

const categoryRef = (slug) => ({
  _type: 'reference',
  _ref: `certificationCategory-${slug}`,
})

const pdfBase = 'C:/Users/Admin/OneDrive/Desktop/Certifications'

const certifications = [
  {
    _id: 'cert-hackathon-build-act',
    title: 'Build & Act Hackathon',
    seal: 'HA',
    issuer: 'Hackathon - 2026',
    year: 2026,
    tag: 'other',
    category: 'hackathon',
    certId: 'hackathon-2026',
    file: `${pdfBase}/eloni hackathon.pdf`,
  },
  {
    _id: 'cert-java-internship',
    title: 'Java Department Internship',
    seal: 'JV',
    issuer: 'Sharp Group LTD - 2025',
    year: 2025,
    tag: 'backend',
    category: 'backend',
    certId: 'sharp-java-2025',
    file: `${pdfBase}/eloni java.pdf`,
  },
  {
    _id: 'cert-full-stack-development',
    title: 'Full Stack Development',
    seal: 'FS',
    issuer: 'Tectigon Academy - 2026',
    year: 2026,
    tag: 'backend',
    category: 'full-stack',
    certId: '25260421',
    file: `${pdfBase}/JAN-FS-PM-26 elon berisha.pdf`,
  },
  {
    _id: 'cert-reference-letter-sharp-group',
    title: 'Reference Letter - Java Department',
    seal: 'RL',
    issuer: 'Sharp Group LTD - 2025',
    year: 2025,
    tag: 'backend',
    category: 'internship',
    certId: 'sharp-reference-2025',
    file: `${pdfBase}/Reference letter Elon Berisha.pdf`,
  },
]

for (const [title, slug, order] of categories) {
  await client.createOrReplace({
    _id: `certificationCategory-${slug}`,
    _type: 'certificationCategory',
    title,
    slug: { _type: 'slug', current: slug },
    order,
  })
}

const oldIds = await client.fetch(`*[_type == "certification"]._id`)
for (const id of oldIds) {
  await client.delete(id)
}

const uploaded = []

for (const cert of certifications) {
  if (!existsSync(cert.file)) {
    throw new Error(`Missing PDF: ${cert.file}`)
  }

  const asset = await client.assets.upload('file', createReadStream(cert.file), {
    filename: basename(cert.file),
    contentType: 'application/pdf',
  })

  await client.createOrReplace({
    _id: cert._id,
    _type: 'certification',
    title: cert.title,
    seal: cert.seal,
    issuer: cert.issuer,
    year: cert.year,
    tag: cert.tag,
    category: categoryRef(cert.category),
    status: 'verified',
    certId: cert.certId,
    pdf: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
    media: { _type: 'file', asset: { _type: 'reference', _ref: asset._id } },
  })

  uploaded.push({ title: cert.title, issuer: cert.issuer, year: cert.year, file: basename(cert.file) })
}

console.log(JSON.stringify({ removedOldCertifications: oldIds.length, uploaded: uploaded.length, certifications: uploaded }, null, 2))
