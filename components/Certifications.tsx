'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MaskLine, FadeUp, EASE } from './Reveal'
import { safeHttpsUrl, safeSanityAssetUrl } from '@/lib/safe-url'

interface Cert {
  _id: string
  seal: string
  issuer: string
  year: number
  title: string
  tag: 'backend' | 'cloud' | 'lang' | 'other'
  categoryTitle?: string | null
  categorySlug?: string | null
  status: 'verified' | 'in-progress'
  certId?: string
  url?: string
  pdfUrl?: string | null
  mediaUrl?: string | null
  mediaMimeType?: string | null
  previewImageUrl?: string | null
}

interface Props {
  certs: Cert[]
  sectionLabel?: string | null
  title?: string | null
  allLabel?: string | null
  previewLabel?: string | null
  verifyLabel?: string | null
  verifiedLabel?: string | null
  inProgressLabel?: string | null
  idLabel?: string | null
  yearLabel?: string | null
  modalLabel?: string | null
  openLabel?: string | null
  closeLabel?: string | null
}

function getPreviewUrl(cert: Cert) {
  return safeSanityAssetUrl(cert.mediaUrl) ?? safeSanityAssetUrl(cert.pdfUrl) ?? safeSanityAssetUrl(cert.previewImageUrl) ?? null
}

function isImagePreview(cert: Cert) {
  const url = getPreviewUrl(cert)
  return Boolean(cert.previewImageUrl && url === cert.previewImageUrl) || Boolean(cert.mediaMimeType?.startsWith('image/'))
}

export function Certifications({
  certs,
  sectionLabel = '',
  title = '',
  allLabel = '',
  previewLabel = '',
  verifyLabel = '',
  verifiedLabel = '',
  inProgressLabel = '',
  idLabel = '',
  yearLabel = '',
  modalLabel = '',
  openLabel = '',
  closeLabel = '',
}: Props) {
  const [active, setActive] = useState<string>('all')
  const [preview, setPreview] = useState<Cert | null>(null)
  const [isMobileSheet, setIsMobileSheet] = useState(false)
  const sectionParts = (sectionLabel ?? '').split('/').map((part) => part.trim()).filter(Boolean)
  const sectionName = sectionParts[1] ?? sectionParts[0] ?? ''

  useEffect(() => {
    const check = () => setIsMobileSheet(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check, { passive: true })
    return () => window.removeEventListener('resize', check)
  }, [])

  const filters = [
    { label: allLabel, value: 'all' },
    ...Array.from(
      new Map(
        certs.map((cert) => [
          cert.categorySlug ?? cert.tag,
          { label: cert.categoryTitle ?? cert.tag, value: cert.categorySlug ?? cert.tag },
        ])
      ).values()
    ),
  ]

  const visible = certs.filter((c) => active === 'all' || (c.categorySlug ?? c.tag) === active)
  const previewUrl = preview ? getPreviewUrl(preview) : null
  const previewIsImage = preview ? isImagePreview(preview) : false

  return (
    <section id="certs" className="rule-t section-py bg-bg-2">
      <div className="wrap">
        <div className="grid grid-cols-1 lg:grid-cols-[180px_1fr] gap-10 lg:gap-16">
          {/* sticky editorial label */}
          <div className="lg:sticky lg:top-24 self-start">
            <FadeUp>
              <span className="meta-label">{sectionName}</span>
            </FadeUp>
          </div>

          <div>
            <div className="flex flex-col gap-8 mb-12 md:mb-14">
              <h2
                className="m-0 font-display font-bold"
                style={{ fontSize: 'clamp(38px, 5.5vw, 72px)', lineHeight: 1.02, letterSpacing: '-0.03em' }}
              >
                <MaskLine>
                  {title?.includes('trail') ? (
                    <>
                      {title.split('trail')[0]}
                      <span className="font-display text-accent">trail</span>
                      {title.split('trail').slice(1).join('trail')}
                    </>
                  ) : (
                    title
                  )}
                </MaskLine>
              </h2>

              <FadeUp delay={0.15}>
                <div className="flex items-baseline gap-5 pb-2 overflow-x-auto no-scrollbar flex-nowrap md:flex-wrap md:overflow-x-visible justify-start md:justify-center">
                  {filters.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setActive(f.value)}
                      className="filter-tog flex-shrink-0"
                      data-active={active === f.value}
                    >
                      {f.label}{f.value === 'all' ? `(${certs.length})` : ''}
                    </button>
                  ))}
                </div>
              </FadeUp>
            </div>

            {/* ── Cert grid — quiet gallery cards ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px" style={{ background: 'var(--color-hair)', border: '1px solid var(--color-hair)' }}>
              <AnimatePresence mode="popLayout">
                {visible.map((cert, i) => {
                  const hasPreview = Boolean(getPreviewUrl(cert))
                  const verifyUrl = safeHttpsUrl(cert.url)

                  return (
                    <motion.div
                      key={cert._id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.04 }}
                      className={`group relative bg-bg p-5 sm:p-7 flex flex-col gap-6 min-h-[180px] sm:min-h-[200px] transition-colors duration-300 hover:bg-card ${hasPreview ? 'cursor-pointer' : ''}`}
                      role={hasPreview ? 'button' : undefined}
                      tabIndex={hasPreview ? 0 : undefined}
                      onClick={() => hasPreview && setPreview(cert)}
                      onKeyDown={(event) => {
                        if (hasPreview && (event.key === 'Enter' || event.key === ' ')) {
                          event.preventDefault()
                          setPreview(cert)
                        }
                      }}
                    >
                      {/* top row */}
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-mono text-[11px] text-faint">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.12em]">
                          <span className={cert.status === 'verified' ? 'text-dim' : 'text-accent'}>
                            {cert.status === 'verified' ? verifiedLabel : inProgressLabel}
                          </span>
                        </span>
                      </div>

                      {/* title */}
                      <div className="flex-1">
                        <h3 className="m-0 font-display font-bold text-[21px] leading-[1.15] tracking-[-0.02em] transition-colors duration-200 group-hover:text-accent">
                          {cert.title}
                        </h3>
                        <p className="m-0 mt-2 font-mono text-[11px] text-dim">{cert.issuer}</p>
                      </div>

                      {/* footer */}
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="font-mono text-[10px] text-faint uppercase tracking-[0.08em]">
                          {cert.certId ? `${idLabel} ${cert.certId}` : `${yearLabel} ${cert.year}`}
                        </span>
                        <span className="flex items-center gap-5">
                          {hasPreview && (
                            <span className="link-under-in font-mono text-[10px] uppercase tracking-[0.12em] text-dim group-hover:text-ink">
                              {previewLabel}
                            </span>
                          )}
                          {verifyUrl ? (
                            <a
                              href={verifyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(event) => event.stopPropagation()}
                              className="link-under-in font-mono text-[10px] uppercase tracking-[0.12em] text-accent"
                            >
                              {verifyLabel} ↗
                            </a>
                          ) : null}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* ── Preview modal — bottom sheet on mobile, centered on desktop ── */}
      <AnimatePresence>
        {preview && previewUrl && (
          <motion.div
            className={`fixed inset-0 z-[80] ${isMobileSheet ? 'flex flex-col justify-end' : 'px-4 py-6'}`}
            style={{ background: 'rgba(22, 21, 19, 0.55)', backdropFilter: 'blur(6px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label={`${preview.title} ${modalLabel}`}
            onClick={() => setPreview(null)}
          >
            <motion.div
              className={`flex flex-col overflow-hidden bg-bg ${isMobileSheet ? 'w-full max-h-[88svh] rounded-t-2xl' : 'mx-auto h-full max-w-5xl'}`}
              style={{ border: '1px solid var(--color-hair-2)' }}
              initial={isMobileSheet ? { y: '100%' } : { y: 24, scale: 0.985 }}
              animate={isMobileSheet ? { y: 0 } : { y: 0, scale: 1 }}
              exit={isMobileSheet ? { y: '100%' } : { y: 24, scale: 0.985 }}
              transition={{ duration: 0.35, ease: EASE }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="rule-b flex items-center justify-between gap-4 px-6 py-4 flex-shrink-0">
                <div className="min-w-0">
                  <div className="meta-label mb-1">
                    <span className="paren">—</span> {modalLabel}
                  </div>
                  <h3 className="m-0 font-display font-bold text-[22px] tracking-[-0.02em] leading-tight truncate">
                    {preview.title}
                  </h3>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <a
                    href={previewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-under font-mono text-[10px] uppercase tracking-[0.14em] text-ink hidden sm:inline"
                  >
                    {openLabel} ↗
                  </a>
                  <button
                    type="button"
                    onClick={() => setPreview(null)}
                    className="h-11 w-11 md:h-10 md:w-10 flex items-center justify-center text-[18px] text-dim hover:text-ink hover:bg-bg-2 transition-colors duration-200"
                    style={{ border: '1px solid var(--color-hair)' }}
                    aria-label={closeLabel ?? undefined}
                  >
                    ×
                  </button>
                </div>
              </div>
              {previewIsImage ? (
                <div className="min-h-0 flex-1 overflow-auto p-6" style={{ background: '#fff' }}>
                  <img
                    src={previewUrl}
                    alt={`${preview.title} ${modalLabel}`}
                    className="mx-auto max-h-full w-auto max-w-full object-contain"
                  />
                </div>
              ) : (
                <iframe
                  src={`${previewUrl}#toolbar=1&navpanes=0`}
                  title={`${preview.title} ${modalLabel}`}
                  className="min-h-0 flex-1"
                  style={{ background: '#fff' }}
                  sandbox="allow-same-origin allow-scripts allow-downloads"
                  referrerPolicy="no-referrer"
                />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
