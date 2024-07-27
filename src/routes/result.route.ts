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
 *                 statusCode:
 *                   type: number
 *                   example: 200
 *                 title:
 *                   type: string
 *                   example: "OK"
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
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                   format: uuid
 *                                   example: 66a2c1375aeed87e4f7301db
 *                                 first_name:
 *                                   type: string
 *                                   example: Bob
 *                                 last_name:
 *                                   type: string
 *                                   example: Johnson
 *                                 username:
 *                                   type: string
 *                                   example: bobJohnson
 *                                 role:
 *                                   type: string
 *                                   example: user
 *                             voteValue:
 *                               type: integer
 *                               example: -1
 *                             _id:
 *                               type: string
 *                               format: uuid
 *                               example: 66a43d50ada9a255e341e1f6
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-07-25T21:20:14.877Z
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2024-07-27T00:20:55.047Z
 *                       __v:
 *                         type: integer
 *                         example: 41
 *
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No expired plans found"
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
 *
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
 *      500:
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


router.get('/plans/expired/results', authenticate, checkRole(['manager']), getExpiredPlansResults);

export default router;
