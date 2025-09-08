import { NextResponse } from 'next/server'

export function middleware(request) {
  const token = request.cookies.get('token')
  const { pathname } = request.nextUrl

  const protectedRoutes = ['/dashboard', '/profile', '/admin']

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route))

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*', 
    '/admin',        
  ],

}