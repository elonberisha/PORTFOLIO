'use client'
import { MaskLine, FadeUp } from './Reveal'

interface SkillItem {
  name: string
  years: string
}

interface StackGroup {
  _id: string
  name: string
  order: number
  items: SkillItem[]
}

interface Props {
  groups: StackGroup[]
  sectionLabel?: string | null
  title?: string | null
  subtitle?: string | null
}

export function Stack({ groups, sectionLabel = '', title = '', subtitle = '' }: Props) {
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? ''
  const titleLines = (title ?? '').split('|')

  return (
    <section id="stack" className="rule-t py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          {/* sticky editorial label */}
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            <h2
              className="m-0 font-display font-bold"
              style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
            >
              {titleLines.map((line, index) => (
                <MaskLine key={`${line}-${index}`} delay={index * 0.1}>
                  {line.includes('tools') ? (
                    <>
                      {line.split('tools')[0]}
                      <span className="font-display text-accent">tools</span>
                      {line.split('tools').slice(1).join('tools')}
                    </>
                  ) : (
                    line
                  )}
                </MaskLine>
              ))}
            </h2>

            {subtitle && (
              <FadeUp delay={0.15}>
                <p className="m-0 mt-5 mb-14 text-[15px] text-dim font-light max-w-[440px] leading-[1.7]">
                  {subtitle}
                </p>
              </FadeUp>
            )}

            {/* Groups — editorial index rows */}
            <div className={subtitle ? '' : 'mt-14'}>
              {groups.map((g, idx) => (
                <FadeUp key={g._id} delay={idx * 0.06}>
                  <div className="rule-t grid grid-cols-1 md:grid-cols-[64px_220px_1fr] gap-4 md:gap-8 py-9 items-start">
                    {/* index */}
                    <span className="meta-label pt-1.5">
                      <span className="paren">{String(idx + 1).padStart(2, '0')}</span>
                    </span>

                    {/* group name */}
                    <h3 className="m-0 font-display font-bold text-[21px] tracking-[-0.02em] leading-tight">
                      {g.name}
                    </h3>

                    {/* items — inline editorial list */}
                    <div className="flex flex-wrap gap-x-2 gap-y-3 items-baseline">
                      {g.items.map((item, i) => (
                        <span key={item.name} className="group inline-flex items-baseline">
                          <span className="text-[15px] text-ink font-light transition-colors duration-200 group-hover:text-accent cursor-default">
                            {item.name}
                          </span>
                          <sup className="font-mono text-[9px] text-faint ml-1 tracking-wide">
                            {item.years}
                          </sup>
                          {i < g.items.length - 1 && (
                            <span className="text-faint mx-2.5 select-none" aria-hidden="true">/</span>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeUp>
              ))}
              <div className="rule-t" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
