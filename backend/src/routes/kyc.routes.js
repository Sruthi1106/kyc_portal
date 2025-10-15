import { Router } from 'express';
import { upload } from '../utils/multer.js';
import { registerKyc } from '../controllers/kyc.controller.js';

const router = Router();

router.post(
  '/register',
  upload.fields([
    { name: 'aadhaar', maxCount: 1 },
    { name: 'pan', maxCount: 1 },
    { name: 'photo', maxCount: 1 },
  ]),
  registerKyc
);

export default router;
