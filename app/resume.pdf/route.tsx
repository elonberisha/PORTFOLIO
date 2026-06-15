import React from 'react'
import { Document, Link, Page, StyleSheet, Text, View, renderToBuffer } from '@react-pdf/renderer'
import { client } from '@/lib/sanity'
import { certificationsQuery, projectsQuery, resumeQuery, settingsQuery, stackGroupsQuery } from '@/lib/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export const revalidate = 0

interface ContactLink {
  label?: string
  value?: string
}

interface Settings {
  name?: string
  role?: string
  email?: string
  phone?: string
  location?: string
  contactLinks?: ContactLink[]
}

interface ResumeFact {
  label?: string
  value?: string
}

interface ResumeEntry {
  title?: string
  meta?: string
  date?: string
  description?: string
}

interface ResumeSection {
  title?: string
  entries?: ResumeEntry[]
}

interface ResumeContent {
  summary?: string
  facts?: ResumeFact[]
  projectsSectionLabel?: string
  projectsNote?: string
  stackSectionLabel?: string
  certificationsSectionLabel?: string
  customSections?: ResumeSection[]
  showProjects?: boolean
  showStack?: boolean
  showCertifications?: boolean
  footerLeft?: string
  footerRight?: string
}

interface Project {
  _id: string
  title?: string
  description?: string
  techTag?: string
  url?: string
  year?: number
  categories?: Array<{ title?: string }>
}

interface Certification {
  _id: string
  title?: string
  issuer?: string
  year?: number
}

interface StackGroup {
  _id: string
  name?: string
  items?: Array<{ name?: string }>
}

const styles = StyleSheet.create({
  page: {
    paddingTop: 34,
    paddingRight: 38,
    paddingBottom: 30,
    paddingLeft: 48,
    fontFamily: 'Helvetica',
    color: '#1a1612',
    backgroundColor: '#fbfaf6',
    fontSize: 8.7,
    lineHeight: 1.35,
  },
  rail: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 14,
    backgroundColor: '#1d4e5c',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 18,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#d4cab5',
    marginBottom: 12,
  },
  name: {
    fontSize: 30,
    fontFamily: 'Helvetica-Bold',
    letterSpacing: -0.2,
  },
  role: {
    marginTop: 5,
    fontSize: 8,
    color: '#8a8275',
    textTransform: 'uppercase',
    letterSpacing: 1.3,
  },
  contact: {
    width: 170,
    textAlign: 'right',
    color: '#4a443c',
    fontSize: 7.2,
    lineHeight: 1.5,
  },
  summary: {
    width: 430,
    marginBottom: 13,
    paddingLeft: 9,
    borderLeftWidth: 2,
    borderLeftColor: '#1d4e5c',
    color: '#4a443c',
    fontSize: 9.6,
    lineHeight: 1.32,
  },
  body: {
    flexDirection: 'row',
    gap: 16,
  },
  side: {
    width: 150,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#d4cab5',
  },
  main: {
    flex: 1,
  },
  heading: {
    marginTop: 9,
    marginBottom: 7,
    paddingBottom: 3,
    borderBottomWidth: 1,
    borderBottomColor: '#d4cab5',
    color: '#1d4e5c',
    fontSize: 7,
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  firstHeading: {
    marginTop: 0,
  },
  fact: {
    marginBottom: 5,
    color: '#4a443c',
    fontSize: 7.8,
  },
  factLabel: {
    color: '#1a1612',
    fontSize: 6.7,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  certRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 7,
    paddingVertical: 3.2,
    borderBottomWidth: 1,
    borderBottomColor: '#e6decd',
  },
  certTitle: {
    flex: 1,
    color: '#4a443c',
    fontSize: 7.3,
  },
  certYear: {
    color: '#8a8275',
    fontSize: 6.8,
  },
  skill: {
    marginBottom: 6,
  },
  skillName: {
    color: '#1d4e5c',
    fontSize: 6.8,
    fontFamily: 'Helvetica-Bold',
    textTransform: 'uppercase',
    letterSpacing: 0.7,
    marginBottom: 2,
  },
  skillItems: {
    color: '#4a443c',
    fontSize: 7.3,
  },
  entry: {
    marginBottom: 8.5,
  },
  entryHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 2,
  },
  entryTitle: {
    flex: 1,
    fontSize: 9.3,
    fontFamily: 'Helvetica-Bold',
  },
  entryDate: {
    color: '#8a8275',
    fontSize: 7,
  },
  meta: {
    marginBottom: 3,
    color: '#8a8275',
    fontSize: 6.8,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  domain: {
    marginBottom: 3,
    color: '#1d4e5c',
    fontSize: 7,
    textDecoration: 'none',
  },
  projectsNote: {
    marginTop: -3,
    marginBottom: 7,
    color: '#8a8275',
    fontSize: 7.4,
    lineHeight: 1.25,
  },
  description: {
    color: '#4a443c',
    fontSize: 8,
  },
  footer: {
    position: 'absolute',
    left: 48,
    right: 38,
    bottom: 18,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#d4cab5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    color: '#8a8275',
    fontSize: 6.5,
    textTransform: 'uppercase',
    letterSpacing: 0.7,
  },
})

function displayDomain(value?: string) {
  if (!value) return undefined

  try {
    return new URL(value).hostname.replace(/^www\./, '')
  } catch {
    return value.replace(/^https?:\/\//, '').replace(/^www\./, '').replace(/\/$/, '')
  }
}

async function getData() {
  if (!client) {
    return { settings: null, resume: null, projects: [], certifications: [], stackGroups: [] }
  }

  const [settings, resume, projects, certifications, stackGroups] = await Promise.all([
    client.fetch(settingsQuery, {}, { cache: 'no-store' }),
    client.fetch(resumeQuery, {}, { cache: 'no-store' }),
    client.fetch(projectsQuery, {}, { cache: 'no-store' }),
    client.fetch(certificationsQuery, {}, { cache: 'no-store' }),
    client.fetch(stackGroupsQuery, {}, { cache: 'no-store' }),
  ])

  return {
    settings: settings as Settings | null,
    resume: resume as ResumeContent | null,
    projects: (projects ?? []) as Project[],
    certifications: (certifications ?? []) as Certification[],
    stackGroups: (stackGroups ?? []) as StackGroup[],
  }
}

function ResumePdf({
  settings,
  resume,
  projects,
  certifications,
  stackGroups,
}: Awaited<ReturnType<typeof getData>>) {
  const showProjects = resume?.showProjects !== false
  const showStack = resume?.showStack !== false
  const showCertifications = resume?.showCertifications !== false

  return (
    <Document title={`${settings?.name ?? 'Elon Berisha'} Resume`} author={settings?.name ?? 'Elon Berisha'}>
      <Page size="A4" style={styles.page}>
        <View style={styles.rail} fixed />
        <View style={styles.header}>
          <View>
            <Text style={styles.name}>{settings?.name ?? 'Elon Berisha'}</Text>
            <Text style={styles.role}>{settings?.role}</Text>
          </View>
          <View style={styles.contact}>
            {settings?.email && <Text>{settings.email}</Text>}
            {settings?.phone && <Text>{settings.phone}</Text>}
            {settings?.location && <Text>{settings.location}</Text>}
            {(settings?.contactLinks ?? []).slice(0, 3).map((link) => (
              <Text key={`${link.label}-${link.value}`}>{link.value || link.label}</Text>
            ))}
          </View>
        </View>

        {resume?.summary && <Text style={styles.summary}>{resume.summary}</Text>}

        <View style={styles.body}>
          <View style={styles.side}>
            {(resume?.facts ?? []).map((fact, index) => (
              <View key={`${fact.label}-${fact.value}`} style={styles.fact}>
                <Text style={styles.factLabel}>{fact.label}</Text>
                <Text>{fact.value}</Text>
                {index === 0 && <Text> </Text>}
              </View>
            ))}

            {showCertifications && certifications.length > 0 && (
              <View>
                <Text style={[styles.heading, styles.firstHeading]}>{resume?.certificationsSectionLabel ?? 'Certifications'}</Text>
                {certifications.map((cert) => (
                  <View key={cert._id} style={styles.certRow}>
                    <Text style={styles.certTitle}>
                      {cert.title}
                      {cert.issuer ? ` ${cert.issuer}` : ''}
                    </Text>
                    <Text style={styles.certYear}>{cert.year}</Text>
                  </View>
                ))}
              </View>
            )}

            {showStack && stackGroups.length > 0 && (
              <View>
                <Text style={styles.heading}>{resume?.stackSectionLabel ?? 'Stack'}</Text>
                {stackGroups.map((group) => (
                  <View key={group._id} style={styles.skill}>
                    <Text style={styles.skillName}>{group.name}</Text>
                    <Text style={styles.skillItems}>{group.items?.slice(0, 6).map((item) => item.name).join(', ')}</Text>
                  </View>
                ))}
              </View>
            )}
          </View>

          <View style={styles.main}>
            {(resume?.customSections ?? []).map((section, sectionIndex) => (
              <View key={section.title}>
                <Text style={[styles.heading, sectionIndex === 0 ? styles.firstHeading : {}]}>{section.title}</Text>
                {(section.entries ?? []).map((entry) => (
                  <View key={`${section.title}-${entry.title}-${entry.date}`} style={styles.entry} wrap={false}>
                    <View style={styles.entryHead}>
                      <Text style={styles.entryTitle}>{entry.title}</Text>
                      <Text style={styles.entryDate}>{entry.date}</Text>
                    </View>
                    {entry.meta && <Text style={styles.meta}>{entry.meta}</Text>}
                    {entry.description && <Text style={styles.description}>{entry.description}</Text>}
                  </View>
                ))}
              </View>
            ))}

            {showProjects && projects.length > 0 && (
              <View>
                <Text style={styles.heading}>{resume?.projectsSectionLabel ?? 'Projects'}</Text>
                {resume?.projectsNote && <Text style={styles.projectsNote}>{resume.projectsNote}</Text>}
                {projects.slice(0, 6).map((project) => (
                  <View key={project._id} style={styles.entry} wrap={false}>
                    <View style={styles.entryHead}>
                      <Text style={styles.entryTitle}>{project.title}</Text>
                      <Text style={styles.entryDate}>{project.year}</Text>
                    </View>
                    <Text style={styles.meta}>
                      {[project.techTag, ...(project.categories ?? []).map((category) => category.title)].filter(Boolean).join(' - ')}
                    </Text>
                    {project.url && (
                      <Link src={project.url} style={styles.domain}>
                        {displayDomain(project.url)}
                      </Link>
                    )}
                    {project.description && <Text style={styles.description}>{project.description}</Text>}
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <View style={styles.footer} fixed>
          <Text>{resume?.footerLeft}</Text>
          <Text>{resume?.footerRight}</Text>
        </View>
      </Page>
    </Document>
  )
}

export async function GET() {
  const data = await getData()
  const buffer = await renderToBuffer(<ResumePdf {...data} />)

  return new Response(new Uint8Array(buffer), {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="elon-berisha-resume.pdf"',
      'Cache-Control': 'no-store',
    },
  })
}
