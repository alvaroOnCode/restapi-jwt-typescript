import { Router } from 'express';

import UserController from '../controllers/user';

const router = Router();

router.post('/signup', UserController.signUp);

router.post('/signin', UserController.signIn);

export default router;