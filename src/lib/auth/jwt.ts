import { SignJWT, jwtVerify } from 'jose';

// Get secrets from environment or throw if missing
const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET is not defined');
  return new TextEncoder().encode(secret);
};

const getRefreshSecret = () => {
  const secret = process.env.REFRESH_SECRET;
  if (!secret) throw new Error('REFRESH_SECRET is not defined');
  return new TextEncoder().encode(secret);
};

export type JWTPayload = {
  id: string;
  role: string;
};

export async function signAccessToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('15m') // Access token expiration: 15 minutes
    .sign(getJwtSecret());
}

export async function signRefreshToken(payload: JWTPayload) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d') // Refresh token expiration: 7 days
    .sign(getRefreshSecret());
}

export async function verifyAccessToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecret());
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export async function verifyRefreshToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getRefreshSecret());
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}
