import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Session } from '@/models/Session';
import { verifyRefreshToken, signAccessToken, signRefreshToken } from '@/lib/auth/jwt';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const oldRefreshToken = cookieStore.get('refreshToken')?.value;
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    if (!oldRefreshToken) {
      return NextResponse.json({ error: 'No refresh token provided' }, { status: 401 });
    }

    // Verify token cryptographic validity
    const payload = await verifyRefreshToken(oldRefreshToken);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    await dbConnect();

    // Check if session exists and is valid in DB
    const session = await Session.findOne({ refreshToken: oldRefreshToken });
    
    if (!session) {
      // Possible token theft / replay attack!
      // In a strict environment, if an old token is used, we should revoke ALL sessions for that user.
      await logAudit({
        action: 'SUSPICIOUS_ACTIVITY',
        ipAddress,
        userAgent,
        details: { reason: 'Attempted to use unknown refresh token', adminId: payload.id }
      });
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    if (!session.isValid) {
      return NextResponse.json({ error: 'Session has been revoked' }, { status: 401 });
    }

    // Token Rotation: Generate new tokens
    const newAccessToken = await signAccessToken({ id: payload.id, role: payload.role });
    const newRefreshToken = await signRefreshToken({ id: payload.id, role: payload.role });

    // Invalidate old session, create new session
    session.isValid = false;
    await session.save();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await Session.create({
      adminId: session.adminId,
      refreshToken: newRefreshToken,
      userAgent,
      ipAddress,
      expiresAt,
    });

    await logAudit({
      action: 'TOKEN_REFRESH',
      ipAddress,
      userAgent,
      details: { adminId: payload.id }
    });

    const response = NextResponse.json({ success: true }, { status: 200 });
    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('accessToken', newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 15 * 60,
      path: '/',
    });

    response.cookies.set('refreshToken', newRefreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
