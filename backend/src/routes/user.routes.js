import { Router } from 'express';
import { requireAdmin } from '../middlewares/auth.middleware.js';
import { getUser, listUsers } from '../controllers/admin.controller.js';

const router = Router();

router.get('/users', requireAdmin, listUsers);
router.get('/user/:id', requireAdmin, getUser);

export default router;
