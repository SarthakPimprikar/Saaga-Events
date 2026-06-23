import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { Session } from '@/models/Session';
import { verifyPassword } from '@/lib/auth/password';
import { signAccessToken, signRefreshToken } from '@/lib/auth/jwt';
import { loginSchema } from '@/lib/validations/auth.schema';
import { loginRateLimiter } from '@/lib/rate-limit';
import { logAudit } from '@/lib/audit';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // 1. Rate Limiting based on IP
    try {
      await loginRateLimiter.check(5, ipAddress); // Max 5 failed attempts per 15 minutes
    } catch (e) {
      await logAudit({
        action: 'SUSPICIOUS_ACTIVITY',
        ipAddress,
        userAgent,
        details: { reason: 'Rate limit exceeded for login attempts' },
      });
      return NextResponse.json({ error: 'Too many login attempts. Please try again after 15 minutes.' }, { status: 429 });
    }

    // 2. Validate Request Body
    const body = await req.json();
    const result = loginSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json({ error: 'Invalid email or password format.' }, { status: 400 });
    }

    const { email, password, role } = result.data;

    await dbConnect();

    // 3. Find Admin & Verify Role
    const admin = await Admin.findOne({ email });
    if (!admin || admin.role !== role) {
      // Prevent timing attacks by computing dummy hash
      await verifyPassword(password, '$2b$12$NgWqULbuAnQUvIRySzvIWuoIAS5Kd/f3PcSGl4Kxl5/0ByzJbBN7u');
      await logAudit({ action: 'LOGIN_FAILED', email, ipAddress, userAgent, details: { reason: 'User not found or role mismatch' } });
      return NextResponse.json({ error: 'Invalid credentials or role' }, { status: 401 });
    }

    // 4. Check lockout status
    if (admin.lockoutUntil && admin.lockoutUntil > new Date()) {
      await logAudit({ action: 'LOGIN_FAILED', email, ipAddress, userAgent, details: { reason: 'Account locked' } });
      return NextResponse.json({ error: 'Account is locked due to too many failed attempts. Try again later.' }, { status: 403 });
    }

    // 5. Verify Password
    const isValid = await verifyPassword(password, admin.passwordHash);
    
    if (!isValid) {
      admin.failedLoginAttempts += 1;
      
      // Lock account after 5 failed attempts for the specific user
      if (admin.failedLoginAttempts >= 5) {
        const lockoutDate = new Date();
        lockoutDate.setMinutes(lockoutDate.getMinutes() + 15);
        admin.lockoutUntil = lockoutDate;
      }
      await admin.save();
      
      await logAudit({ action: 'LOGIN_FAILED', email, ipAddress, userAgent, details: { reason: 'Invalid password' } });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // 6. Login Successful - Reset lockout
    admin.failedLoginAttempts = 0;
    admin.lockoutUntil = null;
    admin.lastLoginAt = new Date();
    await admin.save();

    // 7. Generate Tokens
    const payload = { id: admin._id.toString(), role: admin.role };
    const accessToken = await signAccessToken(payload);
    const refreshToken = await signRefreshToken(payload);

    // 8. Create Session in DB
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

    await Session.create({
      adminId: admin._id,
      refreshToken,
      userAgent,
      ipAddress,
      expiresAt,
    });

    await logAudit({ action: 'LOGIN_SUCCESS', email, ipAddress, userAgent });

    // 9. Set Cookies and Return Response
    const response = NextResponse.json({ success: true, role: admin.role }, { status: 200 });

    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60, // 15 minutes
      path: '/',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    // CSRF token generation for subsequent mutations
    const csrfToken = crypto.randomUUID();
    response.cookies.set('csrfToken', csrfToken, {
      httpOnly: false, // Frontend needs to read this to attach to headers
      secure: isProd,
      sameSite: 'strict',
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
