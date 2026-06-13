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
import type { Metadata } from 'next'

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
  projectsAllLabel: '',
  projectsFeaturedLabel: '',
  projectsStackLabel: '',
  projectsYearLabel: '',
  projectsTypeLabel: '',
  projectsFallbackTypeLabel: '',
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

export async function generateMetadata(): Promise<Metadata> {
  const { settings: s } = await getData()
  const title = [s.name, s.role].filter(Boolean).join(' — ')

  return {
    title: title || undefined,
    description: s.heroSub || undefined,
    openGraph: {
      title: title || undefined,
      description: s.heroSub || undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: title || undefined,
      description: s.heroSub || undefined,
    },
  }
}

export default async function Page() {
  const { settings: s, socialLinks, projects, projectCategories, certifications, stackGroups } = await getData()

  const portraitUrl = s.portrait
    ? urlFor(s.portrait)?.width(960).height(1200).fit('crop').auto('format').quality(85).url() ?? null
    : null

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: s.name,
    jobTitle: s.role,
    description: s.heroSub,
    email: s.email,
    telephone: s.phone,
    address: s.location
      ? {
          '@type': 'PostalAddress',
          addressLocality: s.location,
        }
      : undefined,
    alumniOf: s.university
      ? {
          '@type': 'CollegeOrUniversity',
          name: s.university,
        }
      : undefined,
    sameAs: [s.linkedinUrl, s.githubUrl].filter(Boolean),
  }

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
