import {Router} from 'express';
import {loginUser} from '../controllers/authController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /login:
  *   post:
  *     summary: Log in a user
  *     tags: [Auth]
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             type: object
  *             required:
  *               - username
  *               - password
  *             properties:
  *               username:
  *                 type: string
  *               password:
  *                 type: string
  *     responses:
  *       200:
  *         description: Successful login
  *         content:
  *           application/json:
  *             schema:
  *               type: object
  *               properties:
  *                 token:
  *                   type: string
 *       401:
 *         description: Invalid Username or password
 *
 *       400:
 *         description: Enter the correct username and password!
 */
router.post('/login', loginUser);

export default router;
