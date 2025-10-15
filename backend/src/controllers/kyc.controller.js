import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import { filePublicPath } from '../utils/multer.js';

export async function registerKyc(req, res) {
  const { name, email, phone, address, aadhaar, pan, password } = req.body;

  const data = {
    name, email, phone, address, aadhaar, pan,
    documents: {}
  };
  if (req.files?.aadhaar?.[0]) data.documents.aadhaar = filePublicPath(req.files.aadhaar[0].filename);
  if (req.files?.pan?.[0]) data.documents.pan = filePublicPath(req.files.pan[0].filename);
  if (req.files?.photo?.[0]) data.documents.photo = filePublicPath(req.files.photo[0].filename);

  let user = await User.findOne({ email });
  if (user) {
    user.set({ ...data, status: 'Pending' });
    if (password) user.passwordHash = await bcrypt.hash(password, 10);
  } else {
    user = new User({ ...data, passwordHash: password ? await bcrypt.hash(password, 10) : undefined });
  }
  await user.save();
  res.status(201).json(user.toSafeJSON());
}
