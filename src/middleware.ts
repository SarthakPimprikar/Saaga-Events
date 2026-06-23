import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth/jwt';
import { hasAccess, Role } from './lib/permissions';

const protectedApiRoutes = ['/api/admin', '/api/protected'];
const authRoutes = ['/login']; 
const publicRoutes = ['/', '/unauthorized'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const isProtectedApiRoute = protectedApiRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const isPublicRoute = publicRoutes.includes(pathname);

  // Everything that is not API, Auth, Public or Static is considered a Protected UI Route
  const isProtectedUIRoute = !isProtectedApiRoute && !isAuthRoute && !isPublicRoute;

  const token = request.cookies.get('accessToken')?.value;

  // CSRF for state-changing protected APIs
  if (isProtectedApiRoute && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    const csrfHeader = request.headers.get('x-csrf-token');
    const csrfCookie = request.cookies.get('csrfToken')?.value;
    if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
      return NextResponse.json({ error: 'CSRF token missing or invalid' }, { status: 403 });
    }
  }

  // Handle protected API Routes
  if (isProtectedApiRoute) {
    if (!token) return NextResponse.json({ error: 'Unauthorized access' }, { status: 401 });
    
    const payload = await verifyAccessToken(token);
    if (!payload) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    
    // Additional API RBAC logic can go here in future
    return NextResponse.next();
  }

  // Handle Protected UI Routes
  if (isProtectedUIRoute) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    const payload = await verifyAccessToken(token);
    
    if (!payload) {
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('accessToken');
      return response;
    }

    // Role-Based Authorization
    if (!hasAccess(payload.role as Role, pathname)) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    const response = NextResponse.next();
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  }

  // Handle Auth Routes (Unified Login Page)
  if (isAuthRoute && token) {
    const payload = await verifyAccessToken(token);
    if (payload) {
      if (payload.role === 'ADMIN') return NextResponse.redirect(new URL('/dashboard', request.url));
      if (payload.role === 'CMS') return NextResponse.redirect(new URL('/cms/home', request.url));
      if (payload.role === 'LEAD_MGT') return NextResponse.redirect(new URL('/leads/dashboard', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
