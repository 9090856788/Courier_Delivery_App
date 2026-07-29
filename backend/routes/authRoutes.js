import express from "express";
import { loginUser, registerUser } from "../controllers/authController.js";
import { authLimiter } from "../middlewares/rateLimiter.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Authentication
 *  description: Endpoint for admin authentication & Management.
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Admin login
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       200:
 *         description: Successful login, returning user info & JWT token.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Invalid email or password.
 */

router.post("/login", authLimiter, loginUser);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Add New Admin User
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: User created successfully.
 *       400:
 *         description: Validation error.
 *       401:
 *         description: Unauthorized.
 */
router.post("/register", protect, adminOnly, registerUser);

export default router;