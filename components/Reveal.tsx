'use client'
import { motion } from 'framer-motion'

const EASE = [0.625, 0.05, 0, 1] as const

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
  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '112%' }}
        whileInView={{ y: '0%' }}
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
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
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
