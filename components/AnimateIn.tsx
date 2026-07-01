'use client'
import { useEffect, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const ease = [0.16, 1, 0.3, 1] as const

// useReducedMotion() is unknown during SSR/first paint; gating on `mounted`
// keeps server and client output identical until after hydration.
function useSafeReducedMotion() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const prefersReduced = useSafeReducedMotion()
  return mounted && !!prefersReduced
}

export function AnimateIn({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const prefersReduced = useSafeReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={itemVariants}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimateStagger({
  children,
  className,
  stagger = 0.08,
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
}) {
  const prefersReduced = useSafeReducedMotion()
  return (
    <motion.div
      initial={prefersReduced ? 'visible' : 'hidden'}
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        visible: { transition: { staggerChildren: prefersReduced ? 0 : stagger } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function AnimateItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{ duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
