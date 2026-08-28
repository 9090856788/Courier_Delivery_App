import express from "express";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

import { getDashboardStats } from "../controllers/dashboardController.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                              Swagger Tags                                  */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard and analytics endpoints
 */

/* -------------------------------------------------------------------------- */
/*                           Dashboard Statistics                             */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/stats:
 *   get:
 *     summary: Get dashboard statistics
 *     description: Returns complete dashboard statistics including totals, monthly parcel data, monthly revenue, status distribution, user growth and weight distribution.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Dashboard statistics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totals:
 *                   type: object
 *                   properties:
 *                     parcels:
 *                       type: integer
 *                       example: 1250
 *                     users:
 *                       type: integer
 *                       example: 85
 *                     revenue:
 *                       type: number
 *                       example: 450000
 *
 *                 monthlyParcels:
 *                   type: array
 *                   description: Monthly parcel count for the last 12 months.
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: Aug
 *                       parcels:
 *                         type: integer
 *                         example: 120
 *
 *                 monthlyRevenue:
 *                   type: array
 *                   description: Monthly revenue for the last 12 months.
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: Aug
 *                       revenue:
 *                         type: number
 *                         example: 45000
 *
 *                 statusDistribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: delivered
 *                       value:
 *                         type: integer
 *                         example: 350
 *
 *                 userGrowth:
 *                   type: array
 *                   description: Monthly user growth for the last 12 months.
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: Aug
 *                       users:
 *                         type: integer
 *                         example: 15
 *
 *                 weightDistribution:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 0
 *                       range:
 *                         type: string
 *                         example: 0-1 kg
 *                       count:
 *                         type: integer
 *                         example: 120
 *
 *       401:
 *         description: Authentication required.
 *
 *       403:
 *         description: Administrator access required.
 *
 *       500:
 *         description: Internal server error.
 */
router.get("/stats", protect, adminOnly, getDashboardStats);

export default router;
