'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring } from 'framer-motion'
import { safeResumeUrl } from '@/lib/safe-url'

interface NavLink {
  label: string
  href: string
}

interface Props {
  name?: string | null
  navMeta?: string | null
  resumeLabel?: string | null
  resumeUrl?: string | null
  links?: NavLink[] | null
}

export function Nav({ name = '', navMeta = '', resumeLabel = '', resumeUrl, links = [] }: Props) {
  const [scrolled, setScrolled] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  const safeResumeHref = safeResumeUrl(resumeUrl) ?? '/resume'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.625, 0.05, 0, 1] }}
      className="sticky top-0 z-50 bg-bg"
      style={{
        borderBottom: scrolled ? '1px solid var(--color-hair)' : '1px solid transparent',
        transition: 'border-color 0.3s ease',
      }}
    >
      <div className="relative max-w-[1200px] mx-auto px-7 h-[68px] flex items-center justify-between gap-6">
        {/* Wordmark */}
        <a href="#top" className="flex items-baseline gap-2 min-w-0 group">
          <span className="font-display font-bold text-[17px] tracking-[-0.02em] truncate">
            {name}
          </span>
          {navMeta && (
            <span className="meta-label hidden sm:inline">{navMeta}</span>
          )}
        </a>

        {/* Index links */}
        <nav className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8" aria-label="Site navigation">
          {(links ?? []).map((l, i) => (
            <a
              key={`${l.label}-${l.href}`}
              href={l.href}
              className="link-under-in font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-ink transition-colors duration-200"
            >
              <span className="text-accent mr-1.5">({String(i + 1).padStart(2, '0')})</span>
              {l.label}
            </a>
          ))}
        </nav>

        {/* Resume */}
        {resumeLabel && (
          <Link
            href={safeResumeHref}
            target={safeResumeHref.startsWith('/') ? undefined : '_blank'}
            rel={safeResumeHref.startsWith('/') ? undefined : 'noopener noreferrer'}
            className="btn-ink !py-3 !px-5 flex-shrink-0"
          >
            {resumeLabel}
            <span aria-hidden="true">↗</span>
          </Link>
        )}
      </div>

      {/* scroll progress — 1px accent line riding the nav's bottom edge */}
      <motion.div
        className="absolute left-0 bottom-[-1px] h-[2px] w-full origin-left"
        style={{ scaleX: progress, background: 'var(--color-accent)', willChange: 'transform' }}
        aria-hidden="true"
      />
    </motion.nav>
  )
}
