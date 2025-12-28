import { Router } from 'express';
import { createPrompt } from '../controllers/promptController';
import { validatePrompt } from '../middleware/validationMiddleware';

const router = Router();

router.post('/', validatePrompt, createPrompt);

export default router;