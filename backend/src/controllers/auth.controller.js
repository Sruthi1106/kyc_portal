import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { Admin } from '../models/admin.model.js';
import { signToken } from '../utils/jwt.js';

export async function userLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.passwordHash) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ sub: user._id, role: 'user' });
  res.json({ token, role: 'user' });
}

export async function adminLogin(req, res) {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const token = signToken({ sub: admin._id, role: 'admin' });
  res.json({ token, role: 'admin' });
}

export async function me(req, res) {
  const user = await User.findById(req.user.sub);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user.toSafeJSON());
}
