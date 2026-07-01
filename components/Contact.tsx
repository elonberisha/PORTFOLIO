'use client'
import { MaskLine, FadeUp } from './Reveal'
import { safeContactUrl, safeHttpsUrl, safeResumeUrl } from '@/lib/safe-url'

interface ContactLink {
  label?: string | null
  value?: string | null
  url?: string | null
  href?: string | null
}

interface Props {
  email: string
  phone: string
  githubUrl?: string | null
  linkedinUrl?: string | null
  resumeUrl?: string | null
  sectionLabel?: string | null
  title?: string | null
  intro?: string | null
  emailButtonLabel?: string | null
  cvButtonLabel?: string | null
  links?: ContactLink[] | null
}

export function Contact({
  email,
  phone,
  githubUrl,
  linkedinUrl,
  resumeUrl,
  sectionLabel = '',
  title = '',
  intro = '',
  emailButtonLabel = '',
  cvButtonLabel = '',
  links: cmsLinks = [],
}: Props) {
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? ''

  const liveByLabel: Record<string, { value: string; href: string }> = {
    email: { value: email, href: `mailto:${email}` },
    phone: { value: phone, href: `tel:${phone?.replace(/\s/g, '')}` },
    github: { value: githubUrl ?? '', href: safeHttpsUrl(githubUrl) ?? '#' },
    linkedin: { value: linkedinUrl ?? '', href: safeHttpsUrl(linkedinUrl) ?? '#' },
  }

  const links = (cmsLinks ?? [])
    .map((l) => {
      const key = l.label?.toLowerCase().trim() ?? ''
      const live = liveByLabel[key]
      return {
        label: l.label ?? '',
        value: l.value || live?.value || '',
        href: safeContactUrl(l.url || l.href || live?.href) ?? '#',
      }
    })
    .filter((l) => l.value && l.href !== '#')

  const fallbackLinks = [
    email && { label: 'Email', value: email, href: `mailto:${email}` },
    safeHttpsUrl(githubUrl) && { label: 'GitHub', value: githubUrl!.replace(/^https?:\/\//, ''), href: safeHttpsUrl(githubUrl)! },
    safeHttpsUrl(linkedinUrl) && { label: 'LinkedIn', value: linkedinUrl!.replace(/^https?:\/\//, ''), href: safeHttpsUrl(linkedinUrl)! },
    phone && { label: 'Phone', value: phone, href: `tel:${phone.replace(/\s/g, '')}` },
  ].filter(Boolean) as Array<{ label: string; value: string; href: string }>

  const finalLinks = links.length ? links : fallbackLinks
  const safeCvUrl = safeResumeUrl(resumeUrl)

  return (
    <section id="contact" className="rule-t py-16 md:py-28">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          {/* sticky editorial label */}
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            {/* Title */}
            <h2
              className="m-0 mb-5 md:mb-8 font-display font-bold"
              style={{ fontSize: 'clamp(44px, 7vw, 96px)', lineHeight: 0.98, letterSpacing: '-0.035em' }}
            >
              <MaskLine>
                {title?.includes('talk') ? (
                  <>
                    {title.split('talk')[0]}
                    <span className="font-display text-accent">talk</span>
                    {title.split('talk').slice(1).join('talk')}
                  </>
                ) : (
                  title
                )}
              </MaskLine>
            </h2>

            {intro && (
              <FadeUp delay={0.1}>
                <p className="m-0 mb-8 md:mb-12 text-[16px] leading-[1.75] text-dim font-light max-w-[460px]">
                  {intro}
                </p>
              </FadeUp>
            )}

            {/* The big email — the one thing that matters */}
            {email && (
              <FadeUp delay={0.18}>
                <a
                  href={`mailto:${email}`}
                  className="link-under inline-block serif-it text-ink mb-10 md:mb-16 overflow-hidden text-ellipsis max-w-full"
                  style={{ fontSize: 'clamp(24px, 4vw, 52px)', lineHeight: 1.15 }}
                >
                  {email}
                </a>
              </FadeUp>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-12 items-start">
              {/* CTAs */}
              <FadeUp delay={0.25}>
                <div className="flex flex-wrap gap-5">
                  {emailButtonLabel && (
                    <a href={`mailto:${email}`} className="btn-ink">
                      {emailButtonLabel}
                      <span aria-hidden="true">↗</span>
                    </a>
                  )}
                  {cvButtonLabel && safeCvUrl && (
                    <a
                      href={safeCvUrl}
                      target={safeCvUrl.startsWith('/') ? undefined : '_blank'}
                      rel={safeCvUrl.startsWith('/') ? undefined : 'noopener noreferrer'}
                      className="link-under font-mono text-[11px] uppercase tracking-[0.14em] text-ink self-center"
                    >
                      {cvButtonLabel}
                    </a>
                  )}
                </div>
              </FadeUp>

              {/* Link table */}
              <FadeUp delay={0.3}>
                <div className="rule-t max-w-[480px] md:justify-self-end w-full">
                  {finalLinks.map((l) => (
                    <a
                      key={l.label}
                      href={l.href}
                      target={l.href.startsWith('https:') ? '_blank' : undefined}
                      rel={l.href.startsWith('https:') ? 'noopener noreferrer' : undefined}
                      className="rule-b group grid grid-cols-[72px_1fr_auto] sm:grid-cols-[90px_1fr_auto] gap-4 py-4 items-baseline"
                    >
                      <span className="meta-label">{l.label}</span>
                      <span className="text-[13px] font-mono text-dim truncate group-hover:text-accent transition-colors duration-200">
                        {l.value}
                      </span>
                      <span className="text-faint text-[13px] group-hover:text-accent group-hover:-rotate-45 inline-block transition-all duration-300" aria-hidden="true">
                        →
                      </span>
                    </a>
                  ))}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
