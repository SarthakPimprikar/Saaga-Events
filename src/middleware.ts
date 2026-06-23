import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth/jwt';

// Define protected and auth routes
const protectedRoutes = [
  '/admin',
  '/dashboard',
  '/settings',
  '/events',
  '/users',
  '/bookings',
];

const protectedApiRoutes = [
  '/api/admin',
  '/api/protected',
];

const authRoutes = ['/admin/login'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if it's a protected API route
  const isProtectedApiRoute = protectedApiRoutes.some(route => pathname.startsWith(route));
  // Check if it's a protected UI route
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  // Check if it's an auth route (login)
  const isAuthRoute = authRoutes.includes(pathname);

  // Get token from cookies
  const token = request.cookies.get('accessToken')?.value;

  // Basic CSRF check for state-changing API routes
  if (isProtectedApiRoute && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const csrfHeader = request.headers.get('x-csrf-token');
    const csrfCookie = request.cookies.get('csrfToken')?.value;
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return NextResponse.json({ error: 'CSRF token missing or invalid' }, { status: 403 });
    }
  }

  // Handle protected API Routes
  if (isProtectedApiRoute) {
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    }
    const payload = await verifyAccessToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return NextResponse.next();
  }

  // Handle Protected UI Routes
  if (isProtectedRoute && !isAuthRoute) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
    
    const payload = await verifyAccessToken(token);
    if (!payload || payload.role !== 'ADMIN') {
      const loginUrl = new URL('/admin/login', request.url);
      // Clean up invalid cookie
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('accessToken');
      return response;
    }

    const response = NextResponse.next();
    // Prevent caching for protected pages
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  // Handle Auth Routes (Login)
  if (isAuthRoute) {
    if (token) {
      const payload = await verifyAccessToken(token);
      if (payload && payload.role === 'ADMIN') {
        const dashboardUrl = new URL('/dashboard', request.url);
        return NextResponse.redirect(dashboardUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
