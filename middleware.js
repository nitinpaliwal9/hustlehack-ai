import { NextResponse } from 'next/server'

export async function middleware(request) {
  const res = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/static') ||
    pathname.includes('.') ||
    pathname.startsWith('/auth/callback')
  ) {
    return res
  }

  // Allow access to public routes
  const publicRoutes = ['/', '/about', '/contact', '/resources', '/policies']
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route))

  if (isPublicRoute) {
    return res
  }

  // For protected routes, let client-side handle authentication and profile checks
  // This is better handled by the useAuth hook and components
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api).*)',
  ],
}
