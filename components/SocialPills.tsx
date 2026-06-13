'use client'
import { motion } from 'framer-motion'
import { safeHttpsUrl } from '@/lib/safe-url'

interface SocialLink {
  _id: string
  network: string
  label?: string | null
  url: string
}

interface Props {
  links: SocialLink[]
}

export function SocialPills({ links }: Props) {
  if (!links.length) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className="rule-t mt-16 pt-5 flex flex-wrap items-baseline gap-x-8 gap-y-3"
    >
      {links.map((l, i) => {
        const href = safeHttpsUrl(l.url)
        if (!href) return null

        return (
          <a
            key={l._id}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={l.label ?? l.network}
            className="link-under-in font-mono text-[11px] uppercase tracking-[0.14em] text-dim hover:text-accent transition-colors duration-200"
          >
            <span className="text-faint mr-1">{String(i + 1).padStart(2, '0')}</span>
            {l.label ?? l.network}
            <span className="ml-1" aria-hidden="true">↗</span>
          </a>
        )
      })}
    </motion.div>
  )
}
