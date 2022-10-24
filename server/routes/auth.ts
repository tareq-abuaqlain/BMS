import { Router } from 'express';
import { login, signup } from '../controllers';

const router = Router();

router.post('/login', login);
router.post('/signuP', signup);

export default router;
