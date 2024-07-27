import {Router} from 'express';
import {getExpiredPlansResults} from '../controllers/result.controller.ts';
import {authenticate} from '../middlewares/auth.middleware.ts';
import {checkRole} from "@/middlewares/roles.middleware.ts";

const router = Router();

/**
 * @swagger
 * /plans/expired/results:
 *   get:
 *     summary: Get results of expired plans
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved expired plans and their results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Expired plans retrieved successfully"
 *                 plans:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: "60c72b2f9b1e8b001c8cfc7d"
 *                       title:
 *                         type: string
 *                         example: "Plan Title"
 *                       description:
 *                         type: string
 *                         example: "Plan description"
 *                       expirationDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-12-31T23:59:59Z"
 *                       createdBy:
 *                         type: string
 *                         example: "60c72b2f9b1e8b001c8cfc7c"
 *                       votes:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             userId:
 *                               type: string
 *                               example: "60c72b2f9b1e8b001c8cfc7c"
 *                             username:
 *                               type: string
 *                               example: "user123"
 *                             voteValue:
 *                               type: integer
 *                               example: 1
 *       404:
 *         description: No expired plans found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No expired plans found"
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
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */


router.get('/plans/expired/results', authenticate, checkRole(['manager']), getExpiredPlansResults);

export default router;
