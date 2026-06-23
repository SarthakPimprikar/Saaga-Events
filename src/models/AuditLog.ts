import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  action: 'LOGIN_SUCCESS' | 'LOGIN_FAILED' | 'LOGOUT' | 'TOKEN_REFRESH' | 'UNAUTHORIZED_ACCESS' | 'SUSPICIOUS_ACTIVITY';
  email?: string;
  ipAddress: string;
  userAgent: string;
  details?: Record<string, any>;
  createdAt: Date;
}

const AuditLogSchema: Schema = new Schema(
  {
    action: {
      type: String,
      required: true,
      enum: ['LOGIN_SUCCESS', 'LOGIN_FAILED', 'LOGOUT', 'TOKEN_REFRESH', 'UNAUTHORIZED_ACCESS', 'SUSPICIOUS_ACTIVITY'],
    },
    email: {
      type: String,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    details: {
      type: Schema.Types.Mixed,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const AuditLog = mongoose.models.AuditLog || mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
