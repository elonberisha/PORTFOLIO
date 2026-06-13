'use client'
import { MaskLine, FadeUp } from './Reveal'

interface Props {
  aboutQuote: string
  aboutBody: string
  location: string
  university: string
  focus: string
  status: string
  name: string
  sectionLabel?: string | null
  titleTemplate?: string | null
  facts?: Array<{ label?: string | null; value?: string | null }> | null
}

export function About({ aboutQuote, aboutBody, location, university, focus, status, name, sectionLabel = '', titleTemplate = '', facts: cmsFacts = [] }: Props) {
  const paragraphs = aboutBody?.split('\n\n').filter(Boolean) ?? []
  const firstName = name.split(' ')[0] ?? ''
  const title = (titleTemplate ?? '').replace('{firstName}', firstName)
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? ''
  const liveValuesByLabel: Record<string, string> = {
    location,
    university,
    focus,
    status,
  }

  const facts = cmsFacts?.length
    ? cmsFacts.map((fact) => {
        const key = fact.label?.toLowerCase().trim() ?? ''
        return {
          ...fact,
          value: liveValuesByLabel[key] ?? fact.value,
        }
      })
    : [
        { label: 'location', value: location },
        { label: 'university', value: university },
        { label: 'focus', value: focus },
        { label: 'status', value: status },
      ]

  const visibleFacts = facts.filter((fact) => fact.value)

  return (
    <section id="about" className="rule-t py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          {/* sticky editorial label */}
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            {/* Title — serif italic on the name */}
            <h2
              className="m-0 mb-12 font-display font-bold"
              style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            >
              <MaskLine>
                {title.includes(firstName) && firstName ? (
                  <>
                    {title.split(firstName)[0]}
                    <span className="font-display text-accent">{firstName}</span>
                    {title.split(firstName).slice(1).join(firstName)}
                  </>
                ) : (
                  title
                )}
              </MaskLine>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-12 items-start">
              {/* Quote + body */}
              <div>
                {aboutQuote && (
                  <FadeUp delay={0.1}>
                    <p
                      className="serif-it m-0 mb-9 text-ink leading-[1.35]"
                      style={{ fontSize: 'clamp(22px, 2.6vw, 31px)' }}
                    >
                      {aboutQuote}
                    </p>
                  </FadeUp>
                )}

                <FadeUp delay={0.2}>
                  <div className="space-y-5 text-[15px] leading-[1.85] text-dim font-light max-w-[480px]">
                    {paragraphs.map((p, i) => (
                      <p key={i} className="m-0">{p}</p>
                    ))}
                  </div>
                </FadeUp>
              </div>

              {/* Facts — swiss hairline table */}
              <FadeUp delay={0.25}>
                <div className="rule-t">
                  {visibleFacts.map((fact) => (
                    <div
                      key={`${fact.label}-${fact.value}`}
                      className="rule-b grid grid-cols-[100px_1fr] gap-5 py-4 items-baseline"
                    >
                      <span className="meta-label">{fact.label}</span>
                      <span className="text-[14px] text-ink leading-relaxed">{fact.value}</span>
                    </div>
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
