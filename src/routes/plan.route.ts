import {Router} from 'express';
import {createPlan} from '../controllers/plan.controller.ts';
import {authenticate} from "@/middlewares/auth.middleware.ts";
import {checkRole} from "@/middlewares/roles.middleware.ts";

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
 *                 example: "2020-12-31T23:59:59.000Z"
 *     responses:
 *       201:
 *         description: Successfully created a new plan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 201
 *                 title:
 *                   type: string
 *                   example: "New resources are created."
 *                 message:
 *                   type: string
 *                   example: "New plan has added to the database"
 *
 *       400:
 *         description: Bad request, missing required fields
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
 *                   example: "Bad request, missing or incorrect credentials"
 *                 message:
 *                   type: string
 *                   example: "Missing required fields: title, description, expirationDate"
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


router.post('/plans', authenticate, checkRole(['manager']), createPlan);

export default router;
