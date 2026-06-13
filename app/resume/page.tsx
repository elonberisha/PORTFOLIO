import type { Metadata } from 'next'
import { client } from '@/lib/sanity'
import { settingsQuery, projectsQuery, certificationsQuery, stackGroupsQuery, resumeQuery } from '@/lib/queries'
import { ResumeToolbar } from '@/components/ResumeToolbar'
import { safeContactUrl } from '@/lib/safe-url'

interface ContactLink {
  label: string
  value: string
  href: string
}

interface StackItem {
  name: string
}

interface Project {
  _id: string
  title: string
  description?: string
  techTag?: string
  categories?: Array<{ title?: string }>
  year?: number
}

interface Certification {
  _id: string
  title: string
  issuer?: string
  year?: number
}

interface StackGroup {
  _id: string
  name: string
  items?: StackItem[]
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
  toolbarLabel?: string
  printButtonLabel?: string
  homeButtonLabel?: string
  summary?: string
  facts?: ResumeFact[]
  projectsSectionLabel?: string
  stackSectionLabel?: string
  certificationsSectionLabel?: string
  customSections?: ResumeSection[]
  showProjects?: boolean
  showStack?: boolean
  showCertifications?: boolean
  footerLeft?: string
  footerRight?: string
}

export const metadata: Metadata = {
  title: 'Resume',
  robots: { index: false },
}

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

async function getResumeData() {
  if (!client) {
    return { settings: null, resume: null, projects: [], certifications: [], stackGroups: [] }
  }

  try {
    const [settings, resume, projects, certifications, stackGroups] = await Promise.all([
      client.fetch(settingsQuery, {}, { cache: 'no-store' }),
      client.fetch(resumeQuery, {}, { cache: 'no-store' }),
      client.fetch(projectsQuery, {}, { cache: 'no-store' }),
      client.fetch(certificationsQuery, {}, { cache: 'no-store' }),
      client.fetch(stackGroupsQuery, {}, { cache: 'no-store' }),
    ])

    return {
      settings,
      resume,
      projects: projects ?? [],
      certifications: certifications ?? [],
      stackGroups: stackGroups ?? [],
    }
  } catch {
    return { settings: null, resume: null, projects: [], certifications: [], stackGroups: [] }
  }
}

export default async function ResumePage() {
  const data = await getResumeData()
  const s = data.settings
  const resume = data.resume as ResumeContent | null
  const projects = data.projects as Project[]
  const certifications = data.certifications as Certification[]
  const stackGroups = data.stackGroups as StackGroup[]
  const name = s?.name ?? ''
  const [firstName, ...lastParts] = name.split(' ')
  const lastName = lastParts.join(' ')
  const contactLinks = ((s?.contactLinks ?? []) as ContactLink[])
    .map((link) => ({ ...link, href: safeContactUrl(link.href) ?? '' }))
    .filter((link) => link.href)
  const facts = resume?.facts ?? []
  const customSections = resume?.customSections ?? []
  const showProjects = resume?.showProjects !== false
  const showStack = resume?.showStack !== false
  const showCertifications = resume?.showCertifications !== false

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&family=Manrope:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        :root {
          --bg: #f4efe6; --ink: #1a1612; --ink-dim: #4a443c;
          --ink-mute: #8a8275; --line: #d4cab5; --accent: #1d4e5c;
          --display: "Syne", serif; --body: "Manrope", sans-serif;
          --mono: "IBM Plex Mono", monospace;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: var(--bg); display: flex; justify-content: center; padding: 40px 20px 80px; font-family: var(--body); -webkit-font-smoothing: antialiased; }
        .toolbar { position: fixed; top: 20px; right: 20px; z-index: 100; display: flex; align-items: center; gap: 8px; background: var(--ink); color: var(--bg); padding: 8px 8px 8px 18px; border-radius: 999px; font-family: var(--mono); font-size: 12px; box-shadow: 0 10px 30px -10px rgba(0,0,0,0.35); }
        .toolbar span { color: rgba(255,255,255,0.55); margin-right: 4px; }
        .toolbar button, .toolbar a { background: rgba(255,255,255,0.12); border: none; color: var(--bg); font-family: var(--mono); font-size: 11px; padding: 6px 14px; border-radius: 999px; cursor: pointer; text-decoration: none; transition: background 0.2s; }
        .toolbar button:hover, .toolbar a:hover { background: rgba(255,255,255,0.22); }
        .sheet { width: 210mm; min-height: 297mm; background: #fff; padding: 18mm 18mm; box-shadow: 0 30px 80px -30px rgba(0,0,0,0.25); position: relative; }
        .sheet::before { content: ''; position: absolute; top: 0; left: 0; bottom: 0; width: 6mm; background: var(--accent); }
        .header { display: grid; grid-template-columns: 1fr auto; align-items: end; padding-bottom: 14pt; border-bottom: 1px solid var(--line); margin-bottom: 16pt; gap: 24px; }
        .header h1 { font-family: var(--display); font-weight: 600; font-size: 38pt; line-height: 1; color: var(--ink); }
        .header h1 em { font-style: italic; color: var(--accent); font-weight: 500; }
        .header .role { font-family: var(--mono); font-size: 10pt; text-transform: uppercase; letter-spacing: 0.15em; color: var(--ink-mute); margin-top: 6pt; }
        .contact-list { text-align: right; font-family: var(--mono); font-size: 9pt; color: var(--ink-dim); line-height: 1.8; }
        .contact-list a { color: var(--ink-dim); text-decoration: none; }
        .profile-quote { font-family: var(--display); font-style: italic; font-size: 13pt; color: var(--ink-dim); line-height: 1.4; padding-left: 14px; border-left: 2px solid var(--accent); margin-bottom: 20pt; }
        .body { display: grid; grid-template-columns: 1fr 1.7fr; gap: 28px; }
        h2.sh { font-family: var(--mono); font-weight: 500; font-size: 9.5pt; text-transform: uppercase; letter-spacing: 0.18em; color: var(--accent); padding-bottom: 4px; border-bottom: 1px solid var(--line); margin-bottom: 10pt; margin-top: 16pt; }
        h2.sh:first-child { margin-top: 0; }
        .fact { font-size: 10pt; margin-bottom: 5pt; color: var(--ink-dim); }
        .fact strong { color: var(--ink); font-family: var(--mono); font-size: 9pt; text-transform: uppercase; letter-spacing: 0.06em; }
        .entry { margin-bottom: 14pt; }
        .entry .eh { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; margin-bottom: 2pt; }
        .entry .et { font-family: var(--display); font-weight: 600; font-size: 11.5pt; color: var(--ink); }
        .entry .edate { font-family: var(--mono); font-size: 9pt; color: var(--ink-mute); }
        .entry .eplace { font-family: var(--mono); font-size: 9pt; color: var(--ink-mute); margin-bottom: 5pt; }
        .entry p { font-size: 10pt; color: var(--ink-dim); line-height: 1.4; }
        .skills-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; }
        .skill-cell h3 { font-family: var(--mono); font-size: 9pt; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); margin-bottom: 4pt; }
        .skill-cell p { font-size: 10.5pt; color: var(--ink-dim); line-height: 1.5; }
        .cert-row { display: grid; grid-template-columns: 1fr auto; gap: 12px; padding: 4pt 0; border-bottom: 1px solid var(--line); }
        .cert-row span { font-size: 9.5pt; color: var(--ink-dim); }
        .cert-row .cy { font-family: var(--mono); font-size: 9pt; color: var(--ink-mute); }
        .sheet-footer { border-top: 1px solid var(--line); margin-top: 20pt; padding-top: 8pt; display: flex; justify-content: space-between; gap: 16px; }
        .sheet-footer span { font-family: var(--mono); font-size: 8.5pt; text-transform: uppercase; letter-spacing: 0.08em; color: var(--ink-mute); }
        @media print { .toolbar { display: none !important; } body { background: #fff; padding: 0; } .sheet { box-shadow: none; margin: 0; padding: 16mm 18mm; } }
        @page { size: A4; margin: 0; }
        @media (max-width: 900px) { .toolbar { bottom: 20px; top: auto; right: 20px; } .sheet { width: 100%; min-height: auto; padding: 28px 24px; } .sheet::before { display: none; } .body { grid-template-columns: 1fr; } }
      `}</style>

      <ResumeToolbar
        toolbarLabel={resume?.toolbarLabel}
        printButtonLabel={resume?.printButtonLabel}
        homeButtonLabel={resume?.homeButtonLabel}
      />

      <div className="sheet">
        <div className="header">
          <div>
            <h1>{firstName} {lastName && <em>{lastName}</em>}</h1>
            <div className="role">{s?.role}</div>
          </div>
          <div className="contact-list">
            {s?.email && <div>{s.email}</div>}
            {s?.phone && <div>{s.phone}</div>}
            {s?.location && <div>{s.location}</div>}
            {contactLinks.map((link) => (
              <div key={`${link.label}-${link.href}`}>
                <a href={link.href}>{link.value || link.label}</a>
              </div>
            ))}
          </div>
        </div>

        {resume?.summary && <p className="profile-quote">{resume.summary}</p>}

        <div className="body">
          <aside>
            {facts.map((fact) => (
              <div className="fact" key={`${fact.label}-${fact.value}`}>
                <strong>{fact.label}</strong><br />{fact.value}
              </div>
            ))}
          </aside>

          <main>
            {customSections.map((section) => (
              <div key={section.title}>
                <h2 className="sh">{section.title}</h2>
                {(section.entries ?? []).map((entry) => (
                  <div className="entry" key={`${section.title}-${entry.title}-${entry.date}`}>
                    <div className="eh">
                      <span className="et">{entry.title}</span>
                      <span className="edate">{entry.date}</span>
                    </div>
                    {entry.meta && <div className="eplace">{entry.meta}</div>}
                    {entry.description && <p>{entry.description}</p>}
                  </div>
                ))}
              </div>
            ))}

            {showProjects && projects.length > 0 && (
              <>
                <h2 className="sh">{resume?.projectsSectionLabel}</h2>
                {projects.map((project) => (
                  <div className="entry" key={project._id}>
                    <div className="eh">
                      <span className="et">{project.title}</span>
                      <span className="edate">{project.year}</span>
                    </div>
                    <div className="eplace">{[project.techTag, ...(project.categories ?? []).map((category) => category.title)].filter(Boolean).join(' - ')}</div>
                    <p>{project.description}</p>
                  </div>
                ))}
              </>
            )}

            {showStack && stackGroups.length > 0 && (
              <>
                <h2 className="sh">{resume?.stackSectionLabel}</h2>
                <div className="skills-grid">
                  {stackGroups.map((group) => (
                    <div className="skill-cell" key={group._id}>
                      <h3>{group.name}</h3>
                      <p>{group.items?.map((item: StackItem) => item.name).join(', ')}</p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {showCertifications && certifications.length > 0 && (
              <>
                <h2 className="sh">{resume?.certificationsSectionLabel}</h2>
                {certifications.map((cert) => (
                  <div key={cert._id} className="cert-row">
                    <span>{cert.title} <span style={{ color: 'var(--ink-mute)', fontFamily: 'var(--mono)', fontSize: '9pt' }}>· {cert.issuer}</span></span>
                    <span className="cy">{cert.year}</span>
                  </div>
                ))}
              </>
            )}
          </main>
        </div>

        <div className="sheet-footer">
          <span>{resume?.footerLeft}</span>
          <span>{resume?.footerRight}</span>
        </div>
      </div>
    </>
  )
}
