import { User } from '../models/user.model.js';

export async function listUsers(_req, res) {
  const users = await User.find().sort({ createdAt: -1 });
  res.json(users.map(u => u.toSafeJSON()));
}

export async function getUser(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user.toSafeJSON());
}

export async function updateUserStatus(req, res) {
  const { status, reason } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { status, statusReason: reason },
    { new: true }
  );
  if (!user) return res.status(404).json({ message: 'Not found' });
  res.json(user.toSafeJSON());
}
