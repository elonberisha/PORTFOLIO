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
    <section id="stack" className="rule-t section-py">
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
              className="m-0 serif-it font-normal"
              style={{ fontSize: 'clamp(42px, 5.8vw, 78px)', lineHeight: 1.02 }}
            >
              {titleLines.map((line, index) => (
                <MaskLine key={`${line}-${index}`} delay={index * 0.1}>
                  {line.includes('tools') ? (
                    <>
                      {line.split('tools')[0]}
                      <span className="serif-it text-accent">tools</span>
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
                <p className="m-0 mt-4 mb-8 md:mb-14 text-[15px] text-dim font-light max-w-[440px] leading-[1.7]">
                  {subtitle}
                </p>
              </FadeUp>
            )}

            {/* Groups — editorial index rows */}
            <div className={subtitle ? '' : 'mt-14'}>
              {groups.map((g, idx) => (
                <FadeUp key={g._id} delay={idx * 0.06}>
                  <div className="rule-t grid grid-cols-[auto_1fr] md:grid-cols-[42px_minmax(210px,0.52fr)_minmax(0,1fr)] gap-x-3 gap-y-2 md:gap-4 md:gap-5 py-4 md:py-9 items-start">
                    {/* index */}
                    <span className="meta-label pt-1">
                      <span className="paren">{String(idx + 1).padStart(2, '0')}</span>
                    </span>

                    {/* group name */}
                    <h3 className="m-0 serif-it font-normal text-[17px] md:text-[28px] leading-[1.05]">
                      {g.name}
                    </h3>

                    {/* items — inline editorial list */}
                    <div className="col-span-2 md:col-span-1 flex flex-wrap gap-x-1 gap-y-1.5 md:gap-x-2 md:gap-y-3 items-baseline">
                      {g.items.map((item, i) => (
                        <span key={item.name} className="group inline-flex items-baseline">
                          <span className="text-[12px] md:text-[15px] text-ink font-light transition-colors duration-200 group-hover:text-accent cursor-default">
                            {item.name}
                          </span>
                          <sup className="font-mono text-[8px] md:text-[9px] text-faint ml-0.5 md:ml-1 tracking-wide">
                            {item.years}
                          </sup>
                          {i < g.items.length - 1 && (
                            <span className="text-faint mx-1.5 md:mx-2.5 select-none" aria-hidden="true">/</span>
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
