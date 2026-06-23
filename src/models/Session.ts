import mongoose, { Schema, Document } from 'mongoose';

export interface ISession extends Document {
  adminId: mongoose.Types.ObjectId;
  refreshToken: string;
  userAgent: string;
  ipAddress: string;
  expiresAt: Date;
  isValid: boolean;
  createdAt: Date;
}

const SessionSchema: Schema = new Schema(
  {
    adminId: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
      unique: true,
    },
    userAgent: {
      type: String,
      required: true,
    },
    ipAddress: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

// Auto-delete expired sessions (TTL index)
SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.models.Session || mongoose.model<ISession>('Session', SessionSchema);
