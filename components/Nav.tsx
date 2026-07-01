'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion'
import { safeResumeUrl } from '@/lib/safe-url'

const EASE = [0.625, 0.05, 0, 1] as const

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
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.4 })
  const safeResumeHref = safeResumeUrl(resumeUrl) ?? '/resume'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.625, 0.05, 0, 1] }}
        className="sticky top-0 z-[70] bg-bg"
        style={{
          borderBottom: scrolled ? '1px solid var(--color-hair)' : '1px solid transparent',
          transition: 'border-color 0.3s ease',
        }}
      >
        <div className="relative max-w-[1200px] mx-auto px-7 h-[68px] flex items-center justify-between gap-6">
          {/* Wordmark */}
          <a
            href="#top"
            className="flex items-baseline gap-2 min-w-0 group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="font-display font-bold text-[17px] tracking-[-0.02em] truncate">
              {name}
            </span>
            {navMeta && (
              <span className="meta-label hidden sm:inline">{navMeta}</span>
            )}
          </a>

          {/* Index links — desktop only */}
          <nav
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-8"
            aria-label="Site navigation"
          >
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

          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Resume — desktop only */}
            {resumeLabel && (
              <div className="hidden md:block flex-shrink-0">
                <Link
                  href={safeResumeHref}
                  target={safeResumeHref.startsWith('/') ? undefined : '_blank'}
                  rel={safeResumeHref.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="btn-ink !py-3 !px-5"
                >
                  {resumeLabel}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}

            {/* Hamburger — mobile only */}
            <button
              type="button"
              className="md:hidden flex flex-col justify-center gap-[5px] w-10 h-10 items-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <motion.span
                className="block h-[1.5px] w-[18px] rounded-full"
                style={{ background: 'var(--color-ink)' }}
                animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
              <motion.span
                className="block h-[1.5px] w-[18px] rounded-full"
                style={{ background: 'var(--color-ink)' }}
                animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
              />
              <motion.span
                className="block h-[1.5px] w-[18px] rounded-full"
                style={{ background: 'var(--color-ink)' }}
                animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              />
            </button>
          </div>
        </div>

        {/* Scroll progress — 1px accent line riding the nav's bottom edge */}
        <motion.div
          className="absolute left-0 bottom-[-1px] h-[2px] w-full origin-left"
          style={{ scaleX: progress, background: 'var(--color-accent)', willChange: 'transform' }}
          aria-hidden="true"
        />
      </motion.nav>

      {/* Mobile full-screen menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.38, ease: EASE }}
            className="fixed inset-0 z-[60] bg-bg flex flex-col md:hidden pt-[68px]"
          >
            <nav
              className="flex-1 flex flex-col justify-center px-7 gap-0"
              aria-label="Mobile navigation"
            >
              {(links ?? []).map((l, i) => (
                <a
                  key={`${l.label}-${l.href}`}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="group flex items-baseline gap-3 py-5 border-b border-hair last:border-b-0"
                >
                  <span className="font-mono text-[10px] text-accent tracking-[0.14em] shrink-0 pt-1">
                    ({String(i + 1).padStart(2, '0')})
                  </span>
                  <span
                    className="font-display font-normal text-ink group-hover:text-accent transition-colors duration-200"
                    style={{ fontSize: 'clamp(30px, 8vw, 46px)', letterSpacing: '-0.02em', lineHeight: 1.05 }}
                  >
                    {l.label}
                  </span>
                </a>
              ))}
            </nav>

            {resumeLabel && (
              <div className="px-7 pb-10 pt-6">
                <Link
                  href={safeResumeHref}
                  target={safeResumeHref.startsWith('/') ? undefined : '_blank'}
                  rel={safeResumeHref.startsWith('/') ? undefined : 'noopener noreferrer'}
                  onClick={() => setMenuOpen(false)}
                  className="btn-ink w-full justify-center"
                >
                  {resumeLabel}
                  <span aria-hidden="true">↗</span>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
