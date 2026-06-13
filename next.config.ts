import type { NextConfig } from 'next'

const isDevelopment = process.env.NODE_ENV !== 'production'

const publicCsp = [
  "default-src 'self'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  `script-src 'self' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''}`,
  "style-src 'self' 'unsafe-inline' https://api.fontshare.com https://fonts.googleapis.com",
  "font-src 'self' https://cdn.fontshare.com https://fonts.gstatic.com data:",
  "img-src 'self' https://cdn.sanity.io data: blob:",
  "media-src 'self' https://cdn.sanity.io",
  "frame-src https://cdn.sanity.io",
  `connect-src 'self' https://api.fontshare.com https://cdn.sanity.io${isDevelopment ? ' http://localhost:* ws://localhost:*' : ''}`,
  "upgrade-insecure-requests",
].join('; ')

const studioCsp = [
  "default-src 'self' https: blob: data:",
  "base-uri 'self'",
  "form-action 'self' https:",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https:",
  "style-src 'self' 'unsafe-inline' https:",
  "font-src 'self' https: data:",
  "img-src 'self' https: data: blob:",
  "media-src 'self' https: data: blob:",
  "frame-src 'self' https:",
  "connect-src 'self' https: wss:",
].join('; ')

const securityHeaders = [
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), browsing-topics=()' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
]

const config: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
  async headers() {
    return [
      {
        source: '/studio/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: studioCsp },
          { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
        ],
      },
      {
        source: '/:path*',
        headers: [
          ...securityHeaders,
          { key: 'Content-Security-Policy', value: publicCsp },
        ],
      },
    ]
  },
}

export default config
