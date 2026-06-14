'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { MaskLine, FadeUp, EASE } from './Reveal'
import { safeHttpsUrl, safeSanityAssetUrl } from '@/lib/safe-url'

interface ProjectCategory {
  _id: string
  title: string
  slug: string
}

interface Project {
  _id: string
  title: string
  description: string
  techTag: string
  categories?: Array<{ title: string; slug: string }>
  year: number
  url?: string
  previewImageUrl?: string | null
}

interface Props {
  projects: Project[]
  categories?: ProjectCategory[]
  sectionLabel?: string | null
  title?: string | null
  subtitle?: string | null
  selectedLabel?: string | null
  initialLimit?: number | null
  allLabel?: string | null
  featuredLabel?: string | null
  stackLabel?: string | null
  yearLabel?: string | null
  typeLabel?: string | null
  fallbackTypeLabel?: string | null
}

export function Projects({
  projects,
  categories = [],
  sectionLabel = '',
  title = '',
  subtitle = '',
  selectedLabel = '',
  initialLimit = 5,
  allLabel = '',
  featuredLabel = '',
  stackLabel = '',
  yearLabel = '',
  typeLabel = '',
  fallbackTypeLabel = '',
}: Props) {
  const [active, setActive] = useState('selected')
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? ''
  const selectedLimit = Math.max(1, Math.min(projects.length || 1, Number(initialLimit) || 5))

  const categoryCounts = new Map<string, number>()
  for (const project of projects) {
    for (const category of project.categories ?? []) {
      if (!category.slug) continue
      categoryCounts.set(category.slug, (categoryCounts.get(category.slug) ?? 0) + 1)
    }
  }

  const visible = active === 'selected'
    ? projects.slice(0, selectedLimit)
    : active === 'all'
      ? projects
      : projects.filter((project) => project.categories?.some((category) => category.slug === active))
  const featured = visible[0]
  const projectRows = visible.slice(1)
  const featuredUrl = safeHttpsUrl(featured?.url)
  const featuredPreviewUrl = safeSanityAssetUrl(featured?.previewImageUrl)

  return (
    <section id="projects" className="rule-t py-24">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          {/* sticky editorial label */}
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-3">
              <h2
                className="m-0 serif-it font-normal"
                style={{ fontSize: 'clamp(42px, 5.8vw, 78px)', lineHeight: 1.02 }}
              >
                <MaskLine>
                  {title?.includes('shipped') ? (
                    <>
                      {title.split('shipped')[0]}
                      <span className="serif-it text-accent">shipped</span>
                      {title.split('shipped').slice(1).join('shipped')}
                    </>
                  ) : (
                    title
                  )}
                </MaskLine>
              </h2>

              {/* filters */}
              <FadeUp delay={0.15}>
                <div className="flex flex-wrap items-baseline gap-5 pb-2">
                  <button
                    type="button"
                    onClick={() => setActive('selected')}
                    className="filter-tog"
                    data-active={active === 'selected'}
                  >
                    {(selectedLabel || 'selected')}({selectedLimit})
                  </button>
                  <button
                    type="button"
                    onClick={() => setActive('all')}
                    className="filter-tog"
                    data-active={active === 'all'}
                  >
                    {allLabel}({projects.length})
                  </button>
                  {categories.map((category) => {
                    const count = categoryCounts.get(category.slug) ?? 0
                    const disabled = count === 0
                    return (
                      <button
                        key={category._id}
                        type="button"
                        disabled={disabled}
                        onClick={() => !disabled && setActive(category.slug)}
                        className="filter-tog"
                        data-active={active === category.slug}
                      >
                        {category.title}({count})
                      </button>
                    )
                  })}
                </div>
              </FadeUp>
            </div>

            {subtitle && (
              <FadeUp delay={0.1}>
                <p className="m-0 mb-12 text-[15px] text-dim font-light max-w-[440px] leading-[1.7]">
                  {subtitle}
                </p>
              </FadeUp>
            )}

            {featured && (
              <FadeUp delay={0.18}>
                <a
                  href={featuredUrl}
                  target={featuredUrl ? '_blank' : undefined}
                  rel={featuredUrl ? 'noopener noreferrer' : undefined}
                  className={`group grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_320px] gap-8 rule-t rule-b py-8 ${featuredUrl ? 'cursor-pointer' : 'cursor-default'}`}
                >
                  <div className="min-w-0">
                    <div className="meta-label mb-5">
                      <span className="paren">{featuredLabel}</span>
                    </div>
                    <h3
                      className="m-0 serif-it font-normal leading-[0.98] text-ink group-hover:text-accent transition-colors duration-300"
                      style={{ fontSize: 'clamp(38px, 5.2vw, 74px)' }}
                    >
                      {featured.title}
                    </h3>
                    <p className="m-0 mt-6 text-[15px] leading-[1.75] text-dim font-light max-w-[560px]">
                      {featured.description}
                    </p>

                    <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-px bg-hair border border-hair">
                      <div className="bg-bg p-4">
                        <span className="meta-label block mb-2">{stackLabel}</span>
                        <span className="text-[13px] text-ink leading-relaxed">{featured.techTag}</span>
                      </div>
                      <div className="bg-bg p-4">
                        <span className="meta-label block mb-2">{yearLabel}</span>
                        <span className="text-[13px] text-ink leading-relaxed">{featured.year}</span>
                      </div>
                      <div className="bg-bg p-4 col-span-2 sm:col-span-1">
                        <span className="meta-label block mb-2">{typeLabel}</span>
                        <span className="text-[13px] text-ink leading-relaxed">
                          {(featured.categories ?? []).map((category) => category.title).join(', ') || fallbackTypeLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  {featuredPreviewUrl && (
                    <div className="relative aspect-[4/3] overflow-hidden border border-hair bg-bg-2 lg:self-end">
                      <Image
                        src={featuredPreviewUrl}
                        alt={`${featured.title} preview`}
                        fill
                        sizes="(max-width: 1024px) 100vw, 320px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </a>
              </FadeUp>
            )}

            {/* ── Project index rows ── */}
            <div className={featured ? 'mt-8' : subtitle ? '' : 'mt-12'}>
              <AnimatePresence mode="popLayout">
                {projectRows.map((project, i) => {
                  const projectUrl = safeHttpsUrl(project.url)
                  const projectPreviewUrl = safeSanityAssetUrl(project.previewImageUrl)

                  return (
                  <motion.a
                    key={`${active}-${project._id}`}
                    href={projectUrl}
                    target={projectUrl ? '_blank' : undefined}
                    rel={projectUrl ? 'noopener noreferrer' : undefined}
                    layout
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
                    className={`proj-row group block py-8 ${projectUrl ? 'cursor-pointer' : 'cursor-default'}`}
                  >
                    <div className="grid grid-cols-[44px_1fr_auto] md:grid-cols-[64px_1fr_minmax(0,300px)_70px_40px] gap-4 md:gap-7 items-center">
                      {/* index */}
                      <span className="font-mono text-[11px] text-faint group-hover:text-accent transition-colors duration-200">
                        {String(i + 2).padStart(2, '0')}
                      </span>

                      {/* title — the hero of the row */}
                      <h3
                        className="m-0 serif-it font-normal leading-none text-ink transition-transform duration-300 group-hover:translate-x-2 min-w-0 truncate"
                        style={{ fontSize: 'clamp(29px, 3.7vw, 48px)', transitionTimingFunction: 'cubic-bezier(0.625, 0.05, 0, 1)' }}
                      >
                        {project.title}
                      </h3>

                      {/* description + tags */}
                      <div className="hidden md:block min-w-0">
                        <p className="m-0 text-[13px] leading-[1.6] text-dim font-light line-clamp-2">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-x-3 mt-1.5">
                          <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
                            {project.techTag}
                          </span>
                          {(project.categories ?? []).slice(0, 2).map((category) => (
                            <span key={category.slug} className="font-mono text-[10px] uppercase tracking-[0.1em] text-faint">
                              {category.title}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* year */}
                      <span className="hidden md:block font-mono text-[11px] text-dim text-right">
                        {project.year}
                      </span>

                      {/* arrow */}
                      <span
                        className="justify-self-end font-light text-[22px] text-faint group-hover:text-accent transition-all duration-300"
                        style={{ transform: 'rotate(0deg)', transitionTimingFunction: 'cubic-bezier(0.625, 0.05, 0, 1)' }}
                        aria-hidden="true"
                      >
                        <span className="inline-block group-hover:-rotate-45 transition-transform duration-300">→</span>
                      </span>
                    </div>

                    {/* mobile preview */}
                    {projectPreviewUrl && (
                      <div className="md:hidden relative aspect-[16/9] overflow-hidden mt-5 border border-hair">
                        <Image
                          src={projectPreviewUrl}
                          alt={`${project.title} preview`}
                          fill
                          sizes="100vw"
                          className="object-cover"
                        />
                      </div>
                    )}
                  </motion.a>
                )})}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
