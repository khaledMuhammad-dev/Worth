import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    // Support both legacy cookie auth and new Firebase Bearer token auth
    const token = request.cookies.get('worth_admin_token')?.value
    const secret = process.env.ADMIN_SECRET_TOKEN
    const authHeader = request.headers.get('Authorization')

    // Legacy cookie check (for admin UI page navigation)
    if (token && token === secret) {
      return NextResponse.next()
    }

    // Bearer token check (for API routes with Firebase auth)
    if (authHeader?.startsWith('Bearer ')) {
      return NextResponse.next()
    }

    // If neither, redirect to login
    if (!token && !authHeader) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
