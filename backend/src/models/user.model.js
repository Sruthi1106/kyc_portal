import { Schema, model } from 'mongoose';

const documentSchema = new Schema({
  aadhaar: String,
  pan: String,
  photo: String,
}, { _id: false });

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, index: true, required: true },
  phone: { type: String },
  aadhaar: { type: String },
  pan: { type: String },
  address: { type: String },
  documents: { type: documentSchema, default: {} },
  status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
  statusReason: { type: String },
  passwordHash: { type: String },
}, { timestamps: true });

userSchema.methods.toSafeJSON = function () {
  const obj = this.toObject({ virtuals: true });
  delete obj.passwordHash;
  return obj;
};

export const User = model('User', userSchema);
