'use client'
import { useEffect, useState } from 'react'

interface Props {
  name?: string | null
  leftText?: string | null
  rightText?: string | null
  clockLabel?: string | null
  timeZone?: string | null
}

export function Footer({ name = '', leftText = '', rightText = '', clockLabel = '', timeZone = '' }: Props) {
  const [clock, setClock] = useState('')

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: timeZone || 'UTC',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })

    const update = () => setClock([fmt.format(new Date()), clockLabel].filter(Boolean).join(' '))
    update()
    const id = setInterval(update, 30_000)
    return () => clearInterval(id)
  }, [clockLabel, timeZone])

  const letters = (name ?? '').toLowerCase().split('')

  return (
    <footer className="rule-t pt-16 pb-7 overflow-hidden">
      <div className="wrap">
        {/* giant signature — click takes you back to the top */}
        {name && (
          <a
            href="#top"
            className="gname block text-center mb-14"
            style={{ fontSize: 'clamp(44px, 9.5vw, 130px)' }}
            aria-label={name}
          >
            {letters.map((ch, i) => (
              <span key={i} className="ch">
                {ch === ' ' ? ' ' : ch}
              </span>
            ))}
          </a>
        )}

        <div className="rule-t pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="meta-label">{leftText}</span>
          <span className="meta-label">{clock}</span>
          <span className="meta-label">{rightText}</span>
        </div>
      </div>
    </footer>
  )
}
