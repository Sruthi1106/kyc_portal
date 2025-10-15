import { Router } from 'express';
import { adminLogin, me, userLogin } from '../controllers/auth.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/login', userLogin);
router.post('/admin/login', adminLogin);
router.get('/me', requireAuth, me);

export default router;
