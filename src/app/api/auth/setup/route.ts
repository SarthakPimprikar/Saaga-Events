import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Admin } from '@/models/Admin';
import { hashPassword } from '@/lib/auth/password';
import { newPasswordSchema } from '@/lib/validations/auth.schema';

export async function POST(req: Request) {
  try {
    await dbConnect();

    // WARNING: This route is only for initial setup!
    // It will refuse to run if ANY admin already exists in the database.
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json({ error: 'Setup already completed. Admins exist.' }, { status: 403 });
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Validate password strength
    const pwdResult = newPasswordSchema.safeParse({ password });
    if (!pwdResult.success) {
      return NextResponse.json({ error: pwdResult.error.issues[0].message }, { status: 400 });
    }

    const passwordHash = await hashPassword(password);

    const newAdmin = await Admin.create({
      email,
      passwordHash,
      role: 'ADMIN',
      isActive: true,
    });

    return NextResponse.json({ success: true, message: 'Initial Admin created successfully.', adminId: newAdmin._id }, { status: 201 });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
  }
}
