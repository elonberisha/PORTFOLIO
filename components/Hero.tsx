'use client'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { SocialPills } from './SocialPills'
import { EASE } from './Reveal'
import { safeResumeUrl } from '@/lib/safe-url'

interface SocialLink {
  _id: string
  network: string
  label?: string | null
  url: string
}

interface Props {
  name: string
  role: string
  heroSub: string
  eyebrow?: string | null
  primaryCtaLabel?: string | null
  projectsCtaLabel?: string | null
  contactCtaLabel?: string | null
  portraitPlaceholder?: string | null
  photoTag?: string | null
  photoLocation?: string | null
  photoRole?: string | null
  portraitUrl: string | null
  socialLinks: SocialLink[]
  resumeUrl?: string | null
}

function Lines({ text }: { text: string }) {
  return (
    <>
      {text.split('\n').map((line, index) => (
        <span key={`${line}-${index}`}>
          {index > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  )
}

export function Hero({
  name,
  role,
  heroSub,
  eyebrow = '',
  primaryCtaLabel = '',
  projectsCtaLabel = '',
  contactCtaLabel = '',
  portraitPlaceholder = '',
  photoTag = '',
  photoLocation = '',
  photoRole = '',
  portraitUrl,
  socialLinks,
  resumeUrl,
}: Props) {
  const firstName = name.split(' ')[0] ?? name
  const lastName = name.split(' ').slice(1).join(' ')
  const shouldReduceMotion = useReducedMotion()
  const safePrimaryCtaUrl = safeResumeUrl(resumeUrl) ?? '/resume'

  // Disable 3D effects on small screens to prevent scroll jank
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  // Server/first-paint never knows viewport size or reduced-motion preference,
  // so keep 3D off until mounted to avoid a hydration mismatch.
  const disable3D = !mounted || shouldReduceMotion

  const portraitRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: portraitRef,
    offset: ['start end', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], isMobile ? [-8, 8] : [-22, 22])
  const rawRotateY = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [-6, 0, 5] : [-18, 0, 14])
  const rawRotateX = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [3, 0, -2] : [7, 0, -5])
  const rawRotateZ = useTransform(scrollYProgress, [0, 0.5, 1], isMobile ? [-0.6, 0, 0.5] : [-1.4, 0, 1.1])
  const rawSheenX = useTransform(scrollYProgress, [0, 1], ['-45%', '55%'])
  const rawShadow = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile
      ? [
          '10px 16px 30px rgba(22, 21, 19, 0.12)',
          '0px 14px 26px rgba(22, 21, 19, 0.08)',
          '-10px 16px 30px rgba(22, 21, 19, 0.12)',
        ]
      : [
          '24px 34px 70px rgba(22, 21, 19, 0.18)',
          '0px 28px 58px rgba(22, 21, 19, 0.12)',
          '-22px 34px 70px rgba(22, 21, 19, 0.18)',
        ]
  )
  const rotateY = useSpring(rawRotateY, { stiffness: 120, damping: 28, mass: 0.8 })
  const rotateX = useSpring(rawRotateX, { stiffness: 120, damping: 28, mass: 0.8 })
  const rotateZ = useSpring(rawRotateZ, { stiffness: 120, damping: 28, mass: 0.8 })
  const sheenX = useSpring(rawSheenX, { stiffness: 90, damping: 26, mass: 0.8 })

  return (
    <section id="top" className="relative">
      <div className="wrap pt-8 pb-10 md:pt-12 md:pb-14">
        {/* status strip */}
        <div className="flex items-center justify-between gap-4 pb-6 md:pb-10">
          {eyebrow && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
              className="flex items-center gap-2.5"
            >
              <span className="meta-label">{eyebrow}</span>
            </motion.div>
          )}
          {photoLocation && (
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.18 }}
              className="meta-label hidden sm:block"
            >
              {photoLocation}
            </motion.span>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.45fr_1fr] gap-8 lg:gap-10 items-end">
          {/* ── The name — two typographic voices ── */}
          <div>
            <h1
              className="m-0 mb-9"
              style={{ fontSize: 'clamp(64px, 11.5vw, 158px)', lineHeight: 0.94, letterSpacing: '-0.035em' }}
            >
              <span className="block overflow-hidden">
                <motion.span
                  className="block font-display font-normal"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.2 }}
                >
                  {firstName}
                </motion.span>
              </span>
              <span className="block overflow-hidden" style={{ marginTop: '-0.04em' }}>
                <motion.span
                  className="block font-display font-normal"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 1, ease: EASE, delay: 0.32 }}
                >
                  {lastName}
                </motion.span>
              </span>
            </h1>

            {/* role */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.55 }}
              className="meta-label m-0 mb-6"
              style={{ fontSize: '11px' }}
            >
              <span className="text-accent">/</span> {role}
            </motion.p>

            {/* sub */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.65 }}
              className="m-0 mb-10 text-[15px] md:text-[17px] leading-[1.7] text-dim max-w-[440px] font-light"
            >
              {heroSub}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.78 }}
              className="flex flex-wrap items-center gap-4 sm:gap-7"
            >
              {primaryCtaLabel && (
                <Link
                  href={safePrimaryCtaUrl}
                  target={safePrimaryCtaUrl.startsWith('/') ? undefined : '_blank'}
                  rel={safePrimaryCtaUrl.startsWith('/') ? undefined : 'noopener noreferrer'}
                  className="btn-ink"
                >
                  {primaryCtaLabel}
                  <span aria-hidden="true">↗</span>
                </Link>
              )}
              {projectsCtaLabel && (
                <a href="#projects" className="link-under font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                  {projectsCtaLabel}
                </a>
              )}
              {contactCtaLabel && (
                <a href="#contact" className="link-under font-mono text-[11px] uppercase tracking-[0.14em] text-ink">
                  {contactCtaLabel}
                </a>
              )}
            </motion.div>
          </div>

          {/* Portrait with scroll-linked 3D tilt — simplified on mobile */}
          <motion.div
            ref={portraitRef}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.45 }}
            className="portrait-stage max-w-[380px] w-full justify-self-center lg:justify-self-end"
          >
            <motion.div
              className="portrait-card frame-offset"
              style={{
                rotateX: disable3D ? 0 : rotateX,
                rotateY: disable3D ? 0 : rotateY,
                rotateZ: disable3D ? 0 : rotateZ,
                boxShadow: disable3D ? undefined : rawShadow,
              }}
            >
              <div className="portrait-dev portrait-face relative aspect-[4/5] overflow-hidden border border-hair-2 bg-bg-2">
                {portraitUrl ? (
                  <motion.div
                    className="absolute inset-[-26px]"
                    style={{ y: disable3D ? 0 : parallaxY, willChange: 'transform' }}
                  >
                    <Image
                      src={portraitUrl}
                      alt={`Portrait of ${name}`}
                      fill
                      className="object-cover"
                      priority
                      sizes="(max-width: 639px) 200px, (max-width: 1024px) 300px, 430px"
                    />
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center p-8 text-center">
                    <span className="font-mono text-[11px] text-faint leading-relaxed uppercase tracking-[0.08em]">
                      <Lines text={portraitPlaceholder ?? ''} />
                    </span>
                  </div>
                )}
                {!disable3D && (
                  <motion.span
                    className="portrait-sheen"
                    style={{ '--sheen-x': sheenX } as CSSProperties}
                    aria-hidden="true"
                  />
                )}
              </div>
              <span className="portrait-depth" aria-hidden="true" />
            </motion.div>
            {/* caption row */}
            <div className="flex items-baseline justify-between mt-4">
              {photoTag && <span className="meta-label">{photoTag}</span>}
              {photoRole && (
                <span className="font-mono text-[10px] text-faint text-right leading-snug uppercase tracking-[0.08em]">
                  <Lines text={photoRole} />
                </span>
              )}
            </div>
          </motion.div>
        </div>

        <SocialPills links={socialLinks} />
      </div>
    </section>
  )
}
