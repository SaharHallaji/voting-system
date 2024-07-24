import {Router} from 'express';
import {loginUser} from '../controllers/authController';

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
 *                 message:
 *                   type: string
 *                   example: "Invalid username or password!"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "Error message here"
 */


router.post('/login', loginUser);

export default router;
