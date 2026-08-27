import express from "express";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

import { getDashboardStats } from "../controllers/dashboardController.js";

import {
  getRevenueAnalytics,
  getParcelGrowth,
  getTopCities,
  getDeliveryPerformance,
  getAnalyticsSummary,
} from "../controllers/analyticsController.js";

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

/* -------------------------------------------------------------------------- */
/*                           Revenue Analytics                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/revenue:
 *   get:
 *     summary: Get revenue analytics
 *     description: Returns monthly revenue data for the last 12 months.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Revenue analytics retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
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
 *       401:
 *         description: Authentication required.
 *
 *       403:
 *         description: Administrator access required.
 *
 *       500:
 *         description: Internal server error.
 */
router.get("/revenue", protect, adminOnly, getRevenueAnalytics);

/* -------------------------------------------------------------------------- */
/*                            Parcel Growth                                   */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/parcel-growth:
 *   get:
 *     summary: Get parcel growth analytics
 *     description: Returns the number of parcels created for each of the last 12 months.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Parcel growth data retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: Aug
 *                       parcels:
 *                         type: integer
 *                         example: 125
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
router.get("/parcel-growth", protect, adminOnly, getParcelGrowth);

/* -------------------------------------------------------------------------- */
/*                              Top Cities                                    */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/top-cities:
 *   get:
 *     summary: Get top destination cities
 *     description: Returns the cities with the highest number of parcel deliveries.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Maximum number of cities to return. Maximum allowed value is 20.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 20
 *           default: 8
 *         example: 8
 *
 *     responses:
 *       200:
 *         description: Top cities retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       city:
 *                         type: string
 *                         example: Bengaluru
 *                       parcels:
 *                         type: integer
 *                         example: 250
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
router.get("/top-cities", protect, adminOnly, getTopCities);

/* -------------------------------------------------------------------------- */
/*                         Delivery Performance                              */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/delivery-performance:
 *   get:
 *     summary: Get delivery performance
 *     description: Returns monthly delivery performance for the last 12 months based on the latest checkpoint status of each parcel.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Delivery performance retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       month:
 *                         type: string
 *                         example: Aug
 *                       delivered:
 *                         type: number
 *                         example: 82
 *                       pending:
 *                         type: number
 *                         example: 18
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
router.get("/delivery-performance", protect, adminOnly, getDeliveryPerformance);

/* -------------------------------------------------------------------------- */
/*                           Analytics Summary                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get analytics summary
 *     description: Returns dashboard totals, parcel status distribution and number of cities served.
 *     tags:
 *       - Dashboard
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Analytics summary retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
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
 *                 citiesServed:
 *                   type: integer
 *                   example: 25
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
router.get("/summary", protect, adminOnly, getAnalyticsSummary);

export default router;
