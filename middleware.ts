import { NextRequest, NextResponse } from 'next/server'

const REALM = 'Elon Portfolio Studio'
const DEFAULT_STUDIO_HOST = 'studio.elonberisha.com'
const IS_DEVELOPMENT = process.env.NODE_ENV !== 'production'

const publicCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com${IS_DEVELOPMENT ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com",
  "font-src 'self' https://cdn.fontshare.com https://fonts.gstatic.com data:",
  "img-src 'self' https://cdn.sanity.io https://www.google-analytics.com https://stats.g.doubleclick.net data: blob:",
  "media-src 'self' https://cdn.sanity.io",
  "frame-src https://cdn.sanity.io",
  `connect-src 'self' https://api.fontshare.com https://cdn.sanity.io https://www.google-analytics.com https://region1.google-analytics.com https://analytics.google.com${IS_DEVELOPMENT ? ' http://localhost:* ws://localhost:*' : ''}`,
  "worker-src 'self' blob:",
  "upgrade-insecure-requests",
].join('; ')

const studioCsp = [
  "default-src 'self' https: blob: data:",
  "base-uri 'self'",
  "form-action 'self' https:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: blob:",
  "script-src-elem 'self' 'unsafe-inline' https: blob:",
  "style-src 'self' 'unsafe-inline' https:",
  "font-src 'self' https: data:",
  "img-src 'self' https: data: blob:",
  "media-src 'self' https: data: blob:",
  "frame-src 'self' https:",
  "connect-src 'self' https: wss:",
  "worker-src 'self' blob:",
].join('; ')

export function middleware(request: NextRequest) {
  return handleStudioAccess(request)
}

function handleStudioAccess(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const isStudioPath = pathname === '/studio' || pathname.startsWith('/studio/')
  const isProduction = process.env.NODE_ENV === 'production'
  const studioHost = (process.env.STUDIO_HOST || DEFAULT_STUDIO_HOST).toLowerCase()
  const host = (request.headers.get('host') ?? '').split(':')[0].toLowerCase()
  const isStudioHost = host === studioHost

  if (isProduction && isStudioPath && !isStudioHost) {
    return withSecurityHeaders(noIndex(new NextResponse('Not Found', { status: 404 })), false)
  }

  if (isProduction && isStudioHost && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/studio'
    return withSecurityHeaders(noIndex(NextResponse.redirect(url)), true)
  }

  if (!isStudioPath) {
    return withSecurityHeaders(NextResponse.next(), isStudioHost)
  }

  const response = protectStudio(request)
  return withSecurityHeaders(noIndex(response), isStudioHost || isStudioPath)
}

function protectStudio(request: NextRequest) {
  if (process.env.NODE_ENV !== 'production') {
    return NextResponse.next()
  }

  const user = process.env.STUDIO_BASIC_USER
  const password = process.env.STUDIO_BASIC_PASSWORD

  if (!user || !password) {
    return new NextResponse('Not Found', { status: 404 })
  }

  const authorization = request.headers.get('authorization')
  const credentials = parseBasicAuth(authorization)

  if (credentials?.user === user && credentials.password === password) {
    return NextResponse.next()
  }

  return new NextResponse('Authentication required', {
    status: 401,
    headers: {
      'WWW-Authenticate': `Basic realm="${REALM}", charset="UTF-8"`,
    },
  })
}

function noIndex(response: NextResponse) {
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

function withSecurityHeaders(response: NextResponse, useStudioCsp: boolean) {
  response.headers.set('Content-Security-Policy', useStudioCsp ? studioCsp : publicCsp)
  return response
}

function parseBasicAuth(authorization: string | null) {
  if (!authorization?.startsWith('Basic ')) return null

  try {
    const decoded = atob(authorization.slice('Basic '.length))
    const separator = decoded.indexOf(':')
    if (separator === -1) return null

    return {
      user: decoded.slice(0, separator),
      password: decoded.slice(separator + 1),
    }
  } catch {
    return null
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
