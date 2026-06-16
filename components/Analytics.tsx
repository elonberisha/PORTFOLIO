'use client'

import { GoogleAnalytics } from '@next/third-parties/google'
import { usePathname } from 'next/navigation'

interface Props {
  gaId?: string
}

export function Analytics({ gaId }: Props) {
  const pathname = usePathname()

  if (!gaId || pathname === '/studio' || pathname.startsWith('/studio/')) {
    return null
  }

  return <GoogleAnalytics gaId={gaId} />
}
