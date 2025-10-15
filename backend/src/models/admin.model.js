import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  email: { type: String, unique: true, index: true, required: true },
  passwordHash: { type: String, required: true },
}, { timestamps: true });

export const Admin = model('Admin', adminSchema);
