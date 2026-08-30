import express from "express";

import {
  addCheckPoints,
  calculateCostCalculator,
  createParcel,
  getAllParcels,
  getParcelByTrackingId,
} from "../controllers/parcelController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/* -------------------------------------------------------------------------- */
/*                                  Swagger                                   */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * tags:
 *   name: Parcels
 *   description: Parcel management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     CreateParcelRequest:
 *       type: object
 *       required:
 *         - senderName
 *         - senderPhoneNumber
 *         - senderAddress
 *         - receiverName
 *         - receiverPhoneNumber
 *         - receiverAddress
 *         - originCity
 *         - destinationCity
 *         - shipmentType
 *         - parcelCategory
 *         - deliveryType
 *         - parcelWeight
 *         - parcelSize
 *         - deliveryDate
 *
 *       properties:
 *
 *         senderName:
 *           type: string
 *           description: Full name of the sender.
 *           example: Rahul Sharma
 *
 *         senderPhoneNumber:
 *           type: string
 *           description: Sender phone number.
 *           example: "+919876543210"
 *
 *         senderAddress:
 *           type: string
 *           description: Complete sender address.
 *           example: "12 MG Road, Bengaluru, Karnataka"
 *
 *         receiverName:
 *           type: string
 *           description: Full name of the receiver.
 *           example: Amit Kumar
 *
 *         receiverPhoneNumber:
 *           type: string
 *           description: Receiver phone number.
 *           example: "+919812345678"
 *
 *         receiverAddress:
 *           type: string
 *           description: Complete receiver address.
 *           example: "25 Park Street, Kolkata, West Bengal"
 *
 *         originCity:
 *           type: string
 *           description: City from which the parcel is shipped.
 *           example: Bengaluru
 *
 *         destinationCity:
 *           type: string
 *           description: Destination city of the parcel.
 *           example: Kolkata
 *
 *         shipmentType:
 *           type: string
 *           description: Type of shipment.
 *           enum:
 *             - National
 *             - International
 *           example: National
 *
 *         parcelCategory:
 *           type: string
 *           description: Category of the parcel.
 *           enum:
 *             - documents
 *             - electronics
 *             - clothing
 *             - fragile
 *             - food
 *             - medicine
 *             - cosmetics
 *             - books
 *             - small_package
 *             - large_package
 *             - other
 *           example: electronics
 *
 *         deliveryType:
 *           type: string
 *           description: Delivery service selected for the parcel.
 *           enum:
 *             - standard
 *             - sameDay
 *             - overnight
 *           example: standard
 *
 *         parcelWeight:
 *           type: number
 *           format: float
 *           minimum: 0
 *           exclusiveMinimum: true
 *           description: Parcel weight in kilograms.
 *           example: 2.5
 *
 *         parcelSize:
 *           type: string
 *           description: Size category of the parcel.
 *           enum:
 *             - small
 *             - medium
 *             - large
 *           example: medium
 *
 *         parcelDescription:
 *           type: string
 *           description: Additional information about the parcel.
 *           example: Laptop and accessories
 *
 *         deliveryDate:
 *           type: string
 *           format: date-time
 *           description: Expected delivery date.
 *           example: "2026-08-22T10:00:00.000Z"
 *
 *
 *     CheckPoint:
 *       type: object
 *       required:
 *         - location
 *         - title
 *         - status
 *         - updatedBy
 *
 *       properties:
 *
 *         location:
 *           type: string
 *           description: Current location of the parcel.
 *           example: Bengaluru Hub
 *
 *         title:
 *           type: string
 *           description: Checkpoint title.
 *           example: Parcel Arrived
 *
 *         description:
 *           type: string
 *           description: Additional information about the checkpoint.
 *           example: Parcel arrived at Bengaluru sorting facility.
 *
 *         status:
 *           type: string
 *           description: Current shipment status.
 *           enum:
 *             - arrived
 *             - in_transit
 *             - delayed
 *             - out_for_delivery
 *             - delivered
 *           example: arrived
 *
 *         updatedBy:
 *           type: string
 *           description: User or system responsible for the update.
 *           example: "65d123456789abcdef123456"
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2026-08-18T08:30:00.000Z"
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2026-08-18T08:30:00.000Z"
 *
 *
 *     Parcel:
 *       type: object
 *       properties:
 *
 *         _id:
 *           type: string
 *           readOnly: true
 *           example: "66c123456789abcdef123456"
 *
 *         trackingId:
 *           type: string
 *           readOnly: true
 *           description: Tracking ID generated by the server.
 *           example: "IND-18273645-4821"
 *
 *         senderName:
 *           type: string
 *           example: Rahul Sharma
 *
 *         senderPhoneNumber:
 *           type: string
 *           example: "+919876543210"
 *
 *         senderAddress:
 *           type: string
 *           example: "12 MG Road, Bengaluru, Karnataka"
 *
 *         receiverName:
 *           type: string
 *           example: Amit Kumar
 *
 *         receiverPhoneNumber:
 *           type: string
 *           example: "+919812345678"
 *
 *         receiverAddress:
 *           type: string
 *           example: "25 Park Street, Kolkata, West Bengal"
 *
 *         checkPoints:
 *           type: array
 *           readOnly: true
 *           description: Shipment tracking checkpoints generated by the server.
 *           items:
 *             $ref: '#/components/schemas/CheckPoint'
 *
 *         originCity:
 *           type: string
 *           example: Bengaluru
 *
 *         destinationCity:
 *           type: string
 *           example: Kolkata
 *
 *         shipmentType:
 *           type: string
 *           enum:
 *             - National
 *             - International
 *           example: National
 *
 *         parcelCategory:
 *           type: string
 *           enum:
 *             - documents
 *             - electronics
 *             - clothing
 *             - fragile
 *             - food
 *             - medicine
 *             - cosmetics
 *             - books
 *             - small_package
 *             - large_package
 *             - other
 *           example: electronics
 *
 *         deliveryType:
 *           type: string
 *           enum:
 *             - standard
 *             - sameDay
 *             - overnight
 *           example: standard
 *
 *         parcelWeight:
 *           type: number
 *           format: float
 *           example: 2.5
 *
 *         parcelPrice:
 *           type: number
 *           readOnly: true
 *           description: Shipping price calculated by the server.
 *           example: 1600
 *
 *         parcelSize:
 *           type: string
 *           enum:
 *             - small
 *             - medium
 *             - large
 *           example: medium
 *
 *         parcelDescription:
 *           type: string
 *           example: Laptop and accessories
 *
 *         deliveryDate:
 *           type: string
 *           format: date-time
 *           example: "2026-08-22T10:00:00.000Z"
 *
 *         createdBy:
 *           type: string
 *           readOnly: true
 *           description: ID of the admin who created the parcel.
 *           example: "65d123456789abcdef123456"
 *
 *         updatedBy:
 *           type: string
 *           readOnly: true
 *           description: ID of the admin who last updated the parcel.
 *           example: "65d123456789abcdef123456"
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2026-08-18T08:30:00.000Z"
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           readOnly: true
 *           example: "2026-08-18T08:30:00.000Z"
 */

/* -------------------------------------------------------------------------- */
/*                           Create Parcel API                                */
/* -------------------------------------------------------------------------- */

/**
 * @swagger
 * /api/parcels:
 *   post:
 *     summary: Create a new parcel
 *     description: >
 *       Creates a new parcel shipment. Only authenticated administrators
 *       can create parcels. Tracking ID, parcel price, initial checkpoint,
 *       createdBy and updatedBy are generated or assigned by the server.
 *
 *     tags:
 *       - Parcels
 *
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateParcelRequest'
 *
 *     responses:
 *
 *       201:
 *         description: Parcel created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *
 *                 message:
 *                   type: string
 *                   example: Parcel created successfully
 *
 *                 data:
 *                   $ref: '#/components/schemas/Parcel'
 *
 *       400:
 *         description: Invalid parcel data or validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *
 *                 message:
 *                   type: string
 *                   example: "senderName is required"
 *
 *       401:
 *         description: Authentication required.
 *
 *       403:
 *         description: Administrator access required.
 *
 *       409:
 *         description: Tracking ID already exists.
 *
 *       500:
 *         description: Internal server error.
 */
router.post("/", protect, adminOnly, createParcel);

/**
 * @swagger
 * /api/parcels/track/{trackingId}:
 *   get:
 *     summary: Get parcel by tracking ID
 *     description: >
 *       Public endpoint that retrieves parcel tracking information using
 *       the parcel tracking ID. Authentication is not required.
 *
 *     tags:
 *       - Parcels
 *
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         description: Unique tracking ID of the parcel.
 *         schema:
 *           type: string
 *         example: "IND-18273645-4821"
 *
 *     responses:
 *       200:
 *         description: Parcel retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Parcel'
 *
 *       404:
 *         description: Parcel is not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Parcel is not found."
 *
 *       500:
 *         description: Internal server error.
 */

router.get("/track/:trackingId", getParcelByTrackingId);

/**
 * @swagger
 * /api/parcels/{trackingId}/checkpoints:
 *   post:
 *     summary: Add a checkpoint to a parcel
 *     description: >
 *       Adds a new tracking checkpoint to an existing parcel.
 *       Only authenticated administrators can add checkpoints.
 *       The updatedBy field is automatically assigned by the server.
 *
 *     tags:
 *       - Parcels
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: trackingId
 *         required: true
 *         description: Unique tracking ID of the parcel.
 *         schema:
 *           type: string
 *         example: IND-1234567890
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *               - title
 *               - status
 *             properties:
 *               location:
 *                 type: string
 *                 description: Current location of the parcel.
 *                 example: Bhubaneswar Hub
 *
 *               title:
 *                 type: string
 *                 description: Checkpoint title.
 *                 example: Parcel In Transit
 *
 *               description:
 *                 type: string
 *                 description: Additional information about the checkpoint.
 *                 example: Parcel has left the Bhubaneswar sorting facility.
 *
 *               status:
 *                 type: string
 *                 description: Current shipment status.
 *                 enum:
 *                   - arrived
 *                   - in_transit
 *                   - delayed
 *                   - out_for_delivery
 *                   - delivered
 *                 example: in_transit
 *
 *     responses:
 *       201:
 *         description: Checkpoint added successfully.
 *
 *       400:
 *         description: Invalid checkpoint data.
 *
 *       401:
 *         description: Authentication required.
 *
 *       403:
 *         description: Administrator access required.
 *
 *       404:
 *         description: Parcel is not found.
 *
 *       500:
 *         description: Internal server error.
 */
router.post("/:trackingId/checkpoints", protect, adminOnly, addCheckPoints);

/**
 * @swagger
 * /api/parcels:
 *   get:
 *     summary: Get all parcels
 *     description: >
 *       Retrieves a paginated list of all parcel records.
 *       Supports filtering by shipment status and searching by tracking ID.
 *       Only authenticated administrators can access this endpoint.
 *
 *     tags:
 *       - Parcels
 *
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         required: false
 *         description: Page number.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         required: false
 *         description: Number of parcels to return per page.
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 10
 *         example: 10
 *
 *       - in: query
 *         name: status
 *         required: false
 *         description: Filter parcels by shipment status.
 *         schema:
 *           type: string
 *           enum:
 *             - arrived
 *             - in_transit
 *             - delayed
 *             - out_for_delivery
 *             - delivered
 *         example: in_transit
 *
 *       - in: query
 *         name: search
 *         required: false
 *         description: Search parcels by tracking ID.
 *         schema:
 *           type: string
 *         example: IND-123456
 *
 *     responses:
 *       200:
 *         description: Parcel records fetched successfully.
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
router.get("/", protect, adminOnly, getAllParcels);

/**
 * @swagger
 * /api/parcels/calculate-cost:
 *   post:
 *     summary: Calculate parcel shipping cost
 *     description: >
 *       Calculates the shipping cost based on origin city, destination city,
 *       shipment type, parcel category, delivery type, and parcel weight.
 *       This endpoint only calculates the cost and does not create a parcel
 *       or generate a tracking ID.
 *     tags:
 *       - Parcels
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - originCity
 *               - destinationCity
 *               - shipmentType
 *               - parcelCategory
 *               - deliveryType
 *               - parcelWeight
 *
 *             properties:
 *               originCity:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: City from which the parcel is shipped.
 *                 example: Bengaluru
 *
 *               destinationCity:
 *                 type: string
 *                 minLength: 2
 *                 maxLength: 100
 *                 description: Destination city of the parcel.
 *                 example: Kolkata
 *
 *               shipmentType:
 *                 type: string
 *                 description: Type of shipment.
 *                 enum:
 *                   - National
 *                   - International
 *                 example: National
 *
 *               parcelCategory:
 *                 type: string
 *                 description: Category of the parcel.
 *                 enum:
 *                   - documents
 *                   - electronics
 *                   - clothing
 *                   - fragile
 *                   - food
 *                   - medicine
 *                   - cosmetics
 *                   - books
 *                   - small_package
 *                   - large_package
 *                   - other
 *                 example: electronics
 *
 *               deliveryType:
 *                 type: string
 *                 description: Delivery service selected.
 *                 enum:
 *                   - standard
 *                   - sameDay
 *                   - overnight
 *                 example: standard
 *
 *               parcelWeight:
 *                 type: number
 *                 format: float
 *                 minimum: 0
 *                 exclusiveMinimum: true
 *                 description: Parcel weight in kilograms.
 *                 example: 2.5
 *
 *     responses:
 *       200:
 *         description: Shipping cost calculated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 type:
 *                   type: string
 *                   example: national
 *                 parcelCategory:
 *                   type: string
 *                   example: electronics
 *                 price:
 *                   type: number
 *                   description: Calculated shipping price.
 *                   example: 1500
 *
 *       400:
 *         description: Validation error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: '"originCity" is required'
 *
 *       500:
 *         description: Internal server error.
 */
router.post("/calculate-cost", calculateCostCalculator);
export default router;
