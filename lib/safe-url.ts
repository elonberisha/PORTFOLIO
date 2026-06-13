const HTTPS_PROTOCOL = 'https:'
const CONTACT_PROTOCOLS = new Set(['https:', 'mailto:', 'tel:'])

export function safeHttpsUrl(value?: string | null) {
  return safeUrl(value, new Set([HTTPS_PROTOCOL]))
}

export function safeContactUrl(value?: string | null) {
  return safeUrl(value, CONTACT_PROTOCOLS)
}

export function safeResumeUrl(value?: string | null) {
  if (!value) return undefined
  if (value.startsWith('/') && !value.startsWith('//')) return value
  return safeHttpsUrl(value)
}

export function safeSanityAssetUrl(value?: string | null) {
  const url = safeHttpsUrl(value)
  if (!url) return undefined

  try {
    return new URL(url).hostname === 'cdn.sanity.io' ? url : undefined
  } catch {
    return undefined
  }
}

function safeUrl(value: string | null | undefined, allowedProtocols: Set<string>) {
  if (!value) return undefined

  try {
    const url = new URL(value)
    return allowedProtocols.has(url.protocol) ? url.toString() : undefined
  } catch {
    return undefined
  }
}
