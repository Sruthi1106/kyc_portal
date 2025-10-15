import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { updateUserStatus } from '../controllers/admin.controller.js';

const router = Router();

router.put('/user/:id/status', requireAdmin, updateUserStatus);

export default router;
