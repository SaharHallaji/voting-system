import {Router} from 'express';
import {voteOnPlan} from '../controllers/voteController';
import {authenticate} from '../middlewares/authMiddleware';

const router = Router();
/**
 * @swagger
 * /plans/{planId}/vote:
 *   post:
 *     summary: Vote on a plan
 *     tags: [Plans]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: planId
 *         required: true
 *         schema:
 *           type: string
 *           pattern: '^[0-9a-fA-F]{24}$'  # Pattern to validate MongoDB ObjectId
 *         description: The ID of the plan to vote on
 *     requestBody:
 *       description: Vote details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *                 example: "66a0312bc08595f7a6195a53"
 *               username:
 *                 type: string
 *                 example: "bobJohnson"
 *               voteValue:
 *                 type: integer
 *                 example: 1
 *             required:
 *               - userId
 *               - username
 *               - voteValue
 *     responses:
 *       200:
 *         description: Vote successfully recorded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Vote successfully recorded"
 *                 plan:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "60c72b2f9b1e8b001c8cfc7d"
 *                     title:
 *                       type: string
 *                       example: "Plan Title"
 *                     description:
 *                       type: string
 *                       example: "Plan description"
 *                     expirationDate:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-12-31T23:59:59Z"
 *                     createdBy:
 *                       type: string
 *                       example: "60c72b2f9b1e8b001c8cfc7c"
 *                     votes:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           userId:
 *                             type: string
 *                             example: "60c72b2f9b1e8b001c8cfc7c"
 *                           username:
 *                             type: string
 *                             example: "user123"
 *                           voteValue:
 *                             type: integer
 *                             example: 1
 *       400:
 *         description: Invalid request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid request details"
 *       404:
 *         description: Plan not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Plan not found"
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


router.post('/plans/:planId/vote', authenticate, voteOnPlan);

export default router;
