import { NextRequest, NextResponse } from 'next/server'

const REALM = 'Elon Portfolio Studio'
const DEFAULT_STUDIO_HOST = 'studio.elonberisha.com'

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
    return noIndex(new NextResponse('Not Found', { status: 404 }))
  }

  if (isProduction && isStudioHost && pathname === '/') {
    const url = request.nextUrl.clone()
    url.pathname = '/studio'
    return noIndex(NextResponse.redirect(url))
  }

  if (!isStudioPath) {
    return NextResponse.next()
  }

  const response = protectStudio(request)
  return noIndex(response)
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
  matcher: ['/', '/studio/:path*'],
}
