import { Router } from 'express';
import { me, login, register, logout } from './auth.controller';

const router = Router();

router.get('/me', me);
router.get('/logout', logout);
router.post('/login', login);
router.post('/register', register);

export default router;
