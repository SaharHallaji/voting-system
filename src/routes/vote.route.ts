import {Router} from 'express';
import {voteOnPlan} from '../controllers/vote.controller.ts';
import {authenticate} from '../middlewares/auth.middleware.ts';
import {checkRole} from "@/middlewares/roles.middleware.ts";

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
 *       400:
 *         description: Invalid request details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 400
 *                 title:
 *                   type: string
 *                   example: Bad Request
 *                 message:
 *                   type: string
 *                   example: "Invalid request details"
 *       410:
 *         description: Gone!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 410
 *                 title:
 *                   type: string
 *                   example: Gone
 *                 message:
 *                   type: string
 *                   example: "Plan has expired"
 *       404:
 *         description: Plan not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 404
 *                 title:
 *                   type: string
 *                   example: "Not found"
 *                 message:
 *                   type: string
 *                   example: "Plan not found"
 *
 *       401:
 *         description: Unauthorized, invalid token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number,
 *                   example: 401
 *                 title:
 *                   type: string
 *                   example: "Unauthorized"
 *                 message:
 *                   type: string
 *                   example: "No token provided or invalid token"
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number,
 *                   example: 403
 *                 title:
 *                   type: string
 *                   example: "Forbidden"
 *                 message:
 *                   type: string
 *                   example: "Access denied"
 *     500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 500
 *                 title:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 message:
 *                   type: string
 *                   example: "error message"
 */


router.post('/plans/:planId/vote', authenticate,checkRole(['user']), voteOnPlan);

export default router;
