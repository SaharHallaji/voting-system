import {Router} from 'express';
import {createPlan} from '../controllers/planController';
import {authenticate} from "@/middlewares/authMiddleware.ts";

const router = Router();
/**
 * @swagger
 * tags:
 *   name: Plans
 *   description: API endpoints for managing plans
 */

/**
 * @swagger
 * /plans:
 *   post:
 *     summary: Create a new plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Information required to create a new plan
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "New Plan Title"
 *               description:
 *                 type: string
 *                 example: "Description of the new plan"
 *               expirationDate:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-12-31T23:59:59Z"
 *               createdBy:
 *                 type: string
 *                 format: uuid
 *                 example: "a4b6c2e7-47a0-4e1a-8c0d-7d6742f8d5e6"
 *     responses:
 *       201:
 *         description: Successfully created a new plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "60c72b2f9b1e8b001c8cfc7d"
 *                 title:
 *                   type: string
 *                   example: "New Plan Title"
 *                 description:
 *                   type: string
 *                   example: "Description of the new plan"
 *                 expirationDate:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-12-31T23:59:59Z"
 *                 createdBy:
 *                   type: string
 *                   format: uuid
 *                   example: "a4b6c2e7-47a0-4e1a-8c0d-7d6742f8d5e6"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-24T15:30:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   example: "2024-07-24T15:30:00Z"
 *       400:
 *         description: Bad request, missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Missing required fields"
 *       401:
 *         description: Unauthorized, invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No token provided or invalid token"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Server error"
 */



router.post('/plans', authenticate, createPlan);

export default router;
