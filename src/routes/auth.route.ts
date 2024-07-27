import {Router} from 'express';
import {loginUser} from '../controllers/auth.controller.ts';

const router = Router();
/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "bobJohnson"
 *               password:
 *                 type: string
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Login successful
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
 *                   example: "The request was successful"
 *                 message:
 *                   type: string
 *                   example: "Login successful"
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MGY4Zjk1MjVhZmY5MzI2MDdmYmI2MGIiLCJyb2xlIjoidXNlciIsImlhdCI6MTY5NzI2Mjg5NiwiZXhwIjoxNjk3MzQ5MDk2fQ.6bbmZ2uDAEC6gn7Th2XPRgLRkm5OBLPTx9b8XtX5X4c"
 *       400:
 *         description: Bad request, missing or incorrect credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example : 400
 *                 title:
 *                   type: string
 *                   example: "Bad request, missing or incorrect credentials"
 *                 message:
 *                   type: string
 *                   example: "Enter the correct username and password!"
 *       401:
 *         description: Unauthorized, invalid username or password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                   example: 401
 *                 title:
 *                   type: string
 *                   example: "Unauthorized, invalid username or password"
 *                 message:
 *                   type: string
 *                   example: "Either username or password is invalid!"
 *       500:
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


router.post('/login', loginUser);

export default router;
