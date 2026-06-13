'use client'
import { FadeUp, MaskLine } from './Reveal'

interface Props {
  sectionLabel?: string | null
  title?: string | null
  summary?: string | null
  role?: string | null
  keywords?: string[] | null
  knowsAbout?: string[] | null
  memberOfName?: string | null
  facts?: Array<{ question?: string | null; answer?: string | null }> | null
}

export function AISearchProfile({
  sectionLabel = '',
  title = '',
  summary = '',
  role = '',
  keywords = [],
  knowsAbout = [],
  memberOfName = '',
  facts = [],
}: Props) {
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? 'AI Search'
  const visibleFacts = (facts ?? []).filter((fact) => fact.question && fact.answer)
  const topics = [...new Set([...(keywords ?? []), ...(knowsAbout ?? [])].filter(Boolean))]

  if (!summary && !role && !topics.length && !visibleFacts.length) {
    return null
  }

  return (
    <section id="ai-search-profile" className="rule-t py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            {title && (
              <h2
                className="m-0 mb-10 font-display font-bold"
                style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
              >
                <MaskLine>{title}</MaskLine>
              </h2>
            )}

            <div className="grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-12 items-start">
              <FadeUp delay={0.1}>
                <div>
                  {role && <p className="meta-label m-0 mb-5 text-accent">{role}</p>}
                  {summary && (
                    <p className="m-0 text-[17px] leading-[1.75] text-ink font-light max-w-[620px]">
                      {summary}
                    </p>
                  )}
                  {memberOfName && (
                    <p className="m-0 mt-6 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                      Member of {memberOfName}
                    </p>
                  )}
                </div>
              </FadeUp>

              {topics.length > 0 && (
                <FadeUp delay={0.16}>
                  <div className="rule-t">
                    {topics.slice(0, 10).map((topic) => (
                      <div key={topic} className="rule-b py-3">
                        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
                          {topic}
                        </span>
                      </div>
                    ))}
                  </div>
                </FadeUp>
              )}
            </div>

            {visibleFacts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-hair border border-hair mt-14">
                {visibleFacts.map((fact) => (
                  <FadeUp key={fact.question} delay={0.08}>
                    <article className="bg-bg p-6 min-h-[190px]">
                      <h3 className="m-0 mb-5 font-mono text-[11px] uppercase tracking-[0.12em] text-accent leading-relaxed">
                        {fact.question}
                      </h3>
                      <p className="m-0 text-[14px] leading-[1.8] text-dim font-light">
                        {fact.answer}
                      </p>
                    </article>
                  </FadeUp>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
