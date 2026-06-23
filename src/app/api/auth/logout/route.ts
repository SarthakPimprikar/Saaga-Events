import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/mongodb';
import { Session } from '@/models/Session';
import { logAudit } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const ipAddress = req.headers.get('x-forwarded-for') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    if (refreshToken) {
      await dbConnect();
      // Invalidate the session in DB
      await Session.findOneAndUpdate(
        { refreshToken },
        { isValid: false }
      );
    }

    await logAudit({
      action: 'LOGOUT',
      ipAddress,
      userAgent,
      details: { tokenProvided: !!refreshToken }
    });

    const response = NextResponse.json({ success: true }, { status: 200 });

    // Clear all cookies
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('csrfToken');

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    // Even if DB operation fails, we should clear cookies to log user out locally
    const response = NextResponse.json({ success: true, warning: 'Failed to invalidate server session' }, { status: 200 });
    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');
    response.cookies.delete('csrfToken');
    return response;
  }
}
