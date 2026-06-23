import dbConnect from '@/lib/mongodb';
import { AuditLog } from '@/models/AuditLog';

type AuditLogParams = {
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'TOKEN_REFRESH' | 'UNAUTHORIZED_ACCESS' | 'SUSPICIOUS_ACTIVITY';
  email?: string;
  ipAddress: string;
  userAgent: string;
  details?: Record<string, any>;
};

export async function logAudit(params: AuditLogParams) {
  try {
    await dbConnect();
    await AuditLog.create(params);
  } catch (error) {
    console.error('Failed to write audit log:', error);
    // Don't throw - we don't want audit log failures to break the main app flow
  }
}
