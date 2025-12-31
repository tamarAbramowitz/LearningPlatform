import express from 'express';
import { getAIContent, getHistory, getAllPrompts } from '../controllers/promptController';
import { protect, authorize } from '../middleware/authorize';

const router = express.Router();

/**
 * @swagger
 * /api/ai/generate:
 *   post:
 *     summary: Generate AI lesson content
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - category_id
 *               - sub_category_id
 *               - prompt
 *             properties:
 *               category_id:
 *                 type: string
 *               sub_category_id:
 *                 type: string
 *               prompt:
 *                 type: string
 *     responses:
 *       201:
 *         description: Lesson generated
 *       401:
 *         description: Unauthorized
 */
router.post('/generate', protect, getAIContent);

/**
 * @swagger
 * /api/ai/history/{user_id}:
 *   get:
 *     summary: Get user learning history
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User history
 */
router.get('/history/:user_id', protect, getHistory);

/**
 * @swagger
 * /api/ai/all:
 *   get:
 *     summary: Get all prompts (Admin only)
 *     tags: [AI]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: All prompts
 *       403:
 *         description: Forbidden
 */
router.get('/all', protect, authorize('admin'), getAllPrompts);

export default router;