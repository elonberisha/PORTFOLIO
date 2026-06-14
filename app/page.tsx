import { client, urlFor } from '@/lib/sanity'
import {
  settingsQuery,
  socialLinksQuery,
  projectsQuery,
  projectCategoriesQuery,
  certificationsQuery,
  stackGroupsQuery,
} from '@/lib/queries'
import { Nav } from '@/components/Nav'
import { Hero } from '@/components/Hero'
import { About } from '@/components/About'
import { Stack } from '@/components/Stack'
import { Projects } from '@/components/Projects'
import { Certifications } from '@/components/Certifications'
import { Contact } from '@/components/Contact'
import { Footer } from '@/components/Footer'
import { safeHttpsUrl } from '@/lib/safe-url'
import type { Metadata } from 'next'

const SITE_URL = 'https://elonberisha.com'
const DEFAULT_ENTITY_ROLE = 'AI Developer & Full-Stack Software Developer'
const DEFAULT_ENTITY_KEYWORDS = [
  'AI development',
  'full-stack software development',
  'Java',
  'Spring Boot',
  'PostgreSQL',
  'cloud computing',
  'API development',
  'Devycore',
]

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

const EMPTY_SETTINGS = {
  name: '',
  role: '',
  navMeta: '',
  navResumeLabel: '',
  navLinks: [],
  heroEyebrow: '',
  heroSub: '',
  heroPrimaryCtaLabel: '',
  heroProjectsCtaLabel: '',
  heroContactCtaLabel: '',
  heroPortraitPlaceholder: '',
  heroPhotoTag: '',
  heroPhotoLocation: '',
  heroPhotoRole: '',
  aboutSectionLabel: '',
  aboutTitle: '',
  aboutQuote: '',
  aboutBody: '',
  location: '',
  university: '',
  focus: '',
  status: '',
  aboutFacts: [],
  stackSectionLabel: '',
  stackTitle: '',
  stackSubtitle: '',
  projectsSectionLabel: '',
  projectsTitle: '',
  projectsSubtitle: '',
  projectsSelectedLabel: '',
  projectsInitialLimit: 5,
  projectsAllLabel: '',
  projectsFeaturedLabel: '',
  projectsStackLabel: '',
  projectsYearLabel: '',
  projectsTypeLabel: '',
  projectsFallbackTypeLabel: '',
  aiSearchSectionLabel: '',
  aiSearchTitle: '',
  seoTitle: '',
  seoDescription: '',
  entityRole: '',
  entitySummary: '',
  entityKeywords: [],
  knowsAbout: [],
  memberOfName: '',
  memberOfUrl: null,
  sameAsLinks: [],
  aiSearchFacts: [],
  certificationsSectionLabel: '',
  certificationsTitle: '',
  certificationsAllLabel: '',
  certificationsPreviewLabel: '',
  certificationsVerifyLabel: '',
  certificationsVerifiedLabel: '',
  certificationsInProgressLabel: '',
  certificationsIdLabel: '',
  certificationsYearLabel: '',
  certificationsModalLabel: '',
  certificationsOpenLabel: '',
  certificationsCloseLabel: '',
  contactSectionLabel: '',
  contactTitle: '',
  contactIntro: '',
  contactEmailButtonLabel: '',
  contactCvButtonLabel: '',
  contactLinks: [],
  email: '',
  phone: '',
  githubUrl: null,
  linkedinUrl: null,
  resumeUrl: null,
  footerLeft: '',
  footerRight: '',
  footerClockLabel: '',
  footerTimeZone: '',
  portrait: null,
}

async function getData() {
  if (!client) {
    return {
      settings: EMPTY_SETTINGS,
      socialLinks: [],
      projects: [],
      projectCategories: [],
      certifications: [],
      stackGroups: [],
    }
  }

  try {
    const [settings, socialLinks, projects, projectCategories, certifications, stackGroups] = await Promise.all([
      client.fetch(settingsQuery, {}, { cache: 'no-store' }),
      client.fetch(socialLinksQuery, {}, { cache: 'no-store' }),
      client.fetch(projectsQuery, {}, { cache: 'no-store' }),
      client.fetch(projectCategoriesQuery, {}, { cache: 'no-store' }),
      client.fetch(certificationsQuery, {}, { cache: 'no-store' }),
      client.fetch(stackGroupsQuery, {}, { cache: 'no-store' }),
    ])

    return {
      settings: { ...EMPTY_SETTINGS, ...(settings ?? {}) },
      socialLinks: socialLinks ?? [],
      projects: projects ?? [],
      projectCategories: projectCategories ?? [],
      certifications: certifications ?? [],
      stackGroups: stackGroups ?? [],
    }
  } catch {
    return {
      settings: EMPTY_SETTINGS,
      socialLinks: [],
      projects: [],
      projectCategories: [],
      certifications: [],
      stackGroups: [],
    }
  }
}

function jsonLdStringify(value: unknown) {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
    .replace(/\u2028/g, '\\u2028')
    .replace(/\u2029/g, '\\u2029')
}

function compact<T>(items: Array<T | null | undefined | false>) {
  return items.filter(Boolean) as T[]
}

function uniqueStrings(items: Array<string | null | undefined>) {
  return [...new Set(items.map((item) => item?.trim()).filter(Boolean))] as string[]
}

function getEntitySummary(s: typeof EMPTY_SETTINGS) {
  return s.entitySummary || s.seoDescription || s.heroSub || [
    s.name,
    'is an AI developer and full-stack software developer',
    s.memberOfName ? `and member of ${s.memberOfName}` : '',
    'focused on practical software systems, AI-enabled products, APIs, and web applications.',
  ].filter(Boolean).join(' ')
}

export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getData()
  const role = s.entityRole || s.role || DEFAULT_ENTITY_ROLE
  const title = s.seoTitle || [s.name, role].filter(Boolean).join(' - ')
  const description = s.seoDescription || s.entitySummary || s.heroSub || undefined
  const portraitUrl = s.portrait
    ? urlFor(s.portrait)?.width(1200).height(630).fit('crop').auto('format').quality(85).url() ?? undefined
    : undefined

  return {
    title: title || undefined,
    description,
    alternates: {
      canonical: SITE_URL,
    },
    openGraph: {
      type: 'profile',
      url: SITE_URL,
      title: title || undefined,
      description,
      siteName: s.name || 'Elon Berisha',
      images: portraitUrl ? [{ url: portraitUrl, width: 1200, height: 630, alt: `${s.name} portrait` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || undefined,
      description,
      images: portraitUrl ? [portraitUrl] : undefined,
    },
  }
}

export default async function Page() {
  const { settings: s, socialLinks, projects, projectCategories, certifications, stackGroups } = await getData()

  const portraitUrl = s.portrait
    ? urlFor(s.portrait)?.width(960).height(1200).fit('crop').auto('format').quality(85).url() ?? null
    : null
  const entityRole = s.entityRole || s.role || DEFAULT_ENTITY_ROLE
  const entitySummary = getEntitySummary(s)
  const knowsAbout = uniqueStrings([
    ...DEFAULT_ENTITY_KEYWORDS,
    ...(s.entityKeywords ?? []),
    ...(s.knowsAbout ?? []),
  ])
  const sameAs = uniqueStrings([
    safeHttpsUrl(s.linkedinUrl),
    safeHttpsUrl(s.githubUrl),
    ...(s.sameAsLinks ?? []).map((link: { url?: string | null }) => safeHttpsUrl(link.url)),
  ])
  const memberOfUrl = safeHttpsUrl(s.memberOfUrl)
  const defaultFacts = compact([
    {
      question: `Who is ${s.name || 'Elon Berisha'}?`,
      answer: entitySummary,
    },
    {
      question: `What does ${s.name || 'Elon Berisha'} specialize in?`,
      answer: `${s.name || 'Elon Berisha'} focuses on AI development, full-stack software development, API systems, web applications, and practical software products using technologies such as Java, Spring Boot, PostgreSQL, and modern web tools.`,
    },
    s.memberOfName && {
      question: `Is ${s.name || 'Elon Berisha'} part of ${s.memberOfName}?`,
      answer: `Yes. ${s.name || 'Elon Berisha'} is part of the ${s.memberOfName} team.`,
    },
  ])
  const aiSearchFacts = s.aiSearchFacts?.length ? s.aiSearchFacts : defaultFacts

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    url: SITE_URL,
    name: s.name,
    jobTitle: entityRole,
    description: entitySummary,
    image: portraitUrl ?? undefined,
    email: s.email,
    telephone: s.phone,
    knowsAbout,
    keywords: knowsAbout.join(', '),
    address: s.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: s.location,
        }
      : undefined,
    memberOf: s.memberOfName
      ? {
          '@type': 'Organization',
          name: s.memberOfName,
          url: memberOfUrl,
        }
      : undefined,
    alumniOf: s.university
      ? {
          '@type': 'CollegeOrUniversity',
          name: s.university,
        }
      : undefined,
    sameAs,
  }
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: `${s.name || 'Elon Berisha'} Portfolio`,
    description: entitySummary,
    publisher: { '@id': `${SITE_URL}/#person` },
  }
  const profileJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${SITE_URL}/#profile`,
    url: SITE_URL,
    name: s.seoTitle || `${s.name || 'Elon Berisha'} - ${entityRole}`,
    description: entitySummary,
    mainEntity: { '@id': `${SITE_URL}/#person` },
  }
  const faqJsonLd = aiSearchFacts.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: aiSearchFacts.map((fact: { question?: string | null; answer?: string | null }) => ({
          '@type': 'Question',
          name: fact.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: fact.answer,
          },
        })),
      }
    : null
  const jsonLd = compact([personJsonLd, websiteJsonLd, profileJsonLd, faqJsonLd])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdStringify(jsonLd) }}
      />
      <Nav
        name={s.name}
        navMeta={s.navMeta}
        resumeLabel={s.navResumeLabel}
        resumeUrl={s.resumeUrl}
        links={s.navLinks}
      />
      <main>
        <Hero
          name={s.name}
          role={s.role}
          heroSub={s.heroSub}
          eyebrow={s.heroEyebrow}
          primaryCtaLabel={s.heroPrimaryCtaLabel}
          projectsCtaLabel={s.heroProjectsCtaLabel}
          contactCtaLabel={s.heroContactCtaLabel}
          portraitPlaceholder={s.heroPortraitPlaceholder}
          photoTag={s.heroPhotoTag}
          photoLocation={s.heroPhotoLocation}
          photoRole={s.heroPhotoRole}
          portraitUrl={portraitUrl}
          socialLinks={socialLinks}
          resumeUrl={s.resumeUrl}
        />
        <About
          name={s.name}
          aboutQuote={s.aboutQuote}
          aboutBody={s.aboutBody}
          sectionLabel={s.aboutSectionLabel}
          titleTemplate={s.aboutTitle}
          location={s.location}
          university={s.university}
          focus={s.focus}
          status={s.status}
          facts={s.aboutFacts}
        />
        <Stack groups={stackGroups} sectionLabel={s.stackSectionLabel} title={s.stackTitle} subtitle={s.stackSubtitle} />
        <Projects
          projects={projects}
          categories={projectCategories}
          sectionLabel={s.projectsSectionLabel}
          title={s.projectsTitle}
          subtitle={s.projectsSubtitle}
          selectedLabel={s.projectsSelectedLabel}
          initialLimit={s.projectsInitialLimit}
          allLabel={s.projectsAllLabel}
          featuredLabel={s.projectsFeaturedLabel}
          stackLabel={s.projectsStackLabel}
          yearLabel={s.projectsYearLabel}
          typeLabel={s.projectsTypeLabel}
          fallbackTypeLabel={s.projectsFallbackTypeLabel}
        />
        <Certifications
          certs={certifications}
          sectionLabel={s.certificationsSectionLabel}
          title={s.certificationsTitle}
          allLabel={s.certificationsAllLabel}
          previewLabel={s.certificationsPreviewLabel}
          verifyLabel={s.certificationsVerifyLabel}
          verifiedLabel={s.certificationsVerifiedLabel}
          inProgressLabel={s.certificationsInProgressLabel}
          idLabel={s.certificationsIdLabel}
          yearLabel={s.certificationsYearLabel}
          modalLabel={s.certificationsModalLabel}
          openLabel={s.certificationsOpenLabel}
          closeLabel={s.certificationsCloseLabel}
        />
        <Contact
          email={s.email}
          phone={s.phone}
          githubUrl={s.githubUrl}
          linkedinUrl={s.linkedinUrl}
          resumeUrl={s.resumeUrl}
          sectionLabel={s.contactSectionLabel}
          title={s.contactTitle}
          intro={s.contactIntro}
          emailButtonLabel={s.contactEmailButtonLabel}
          cvButtonLabel={s.contactCvButtonLabel}
          links={s.contactLinks}
        />
      </main>
      <Footer
        name={s.name}
        leftText={s.footerLeft}
        rightText={s.footerRight}
        clockLabel={s.footerClockLabel}
        timeZone={s.footerTimeZone}
      />
    </>
  )
}
