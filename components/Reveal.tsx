'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

// useReducedMotion() is unknown during SSR/first paint; gating on `mounted`
// keeps server and client output identical until after hydration.
function useSafeReducedMotion() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const prefersReduced = useReducedMotion()
  return mounted && !!prefersReduced
}

/* Line masked reveal — text slides up from behind an invisible edge */
export function MaskLine({
  children,
  delay = 0,
  className = '',
  as: Tag = 'span',
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  as?: 'span' | 'div'
}) {
  const prefersReduced = useSafeReducedMotion()
  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={prefersReduced ? {} : { y: '112%' }}
        whileInView={prefersReduced ? {} : { y: '0%' }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.9, ease: EASE, delay }}
        style={{ willChange: 'transform' }}
      >
        {children}
      </motion.span>
    </Tag>
  )
}

/* Simple fade-up reveal */
export function FadeUp({
  children,
  delay = 0,
  className = '',
  y = 18,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
  y?: number
}) {
  const prefersReduced = useSafeReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? {} : { opacity: 0, y }}
      whileInView={prefersReduced ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className={className}
      style={{ willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

export { EASE }
