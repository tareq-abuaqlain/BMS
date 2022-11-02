import { Router } from 'express';

import {
  getAnnouncement, postAnnouncement, getAnnouncementById, putAnnouncement, deleteAnnouncement,
} from '../controllers';
import { InferRequestPayload } from '../interfaces/InferUserPayload';
import { Authorize } from '../middleware';

const router = Router();

router.get('/', getAnnouncement);
router.post('/', (req, _, next) => Authorize(req as InferRequestPayload, _, next, 'admin'), postAnnouncement);
router.delete('/:id', (req, _, next) => Authorize(req as InferRequestPayload, _, next, 'admin'), deleteAnnouncement);
router.get('/:id', getAnnouncementById);
router.put('/:id', (req, _, next) => Authorize(req as InferRequestPayload, _, next, 'admin'), putAnnouncement);

export default router;
