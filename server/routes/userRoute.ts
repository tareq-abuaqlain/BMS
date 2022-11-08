import { Router } from 'express';

import { addUser, getUsers, profile } from '../controllers';
import { updateUser } from '../controllers/users';
import { InferRequestPayload } from '../interfaces/InferUserPayload';
import { Authorize } from '../middleware';

const router = Router();
router.use((req, _, next) => Authorize(req as InferRequestPayload, _, next, 'admin'));

router.post('/adduser', addUser);
router.get('/profile', profile);
router.get('/:page', getUsers);
router.put('/profile', updateUser);

export default router;
