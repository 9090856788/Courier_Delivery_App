import { Parcel } from "../models/parcelSchema.js";
import { calculateCost } from "../services/calculateCost.js";
import { generateTrackingId } from "../services/generateTrackingId.js";

import {
  addCheckPointSchema,
  calculateCostSchema,
  createParcelSchema,
} from "../validations/validations.js";

/* -------------------------------------------------------------------------- */
/*                            Create Parcel                                   */
/* -------------------------------------------------------------------------- */

export const createParcel = async (req, res, next) => {
  try {
    /* ---------------------------------------------------------------------- */
    /*                         Validate Request                               */
    /* ---------------------------------------------------------------------- */

    const { error, value } = createParcelSchema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    /* ---------------------------------------------------------------------- */
    /*                          Calculate Price                               */
    /* ---------------------------------------------------------------------- */

    const priceInfo = calculateCost({
      originCity: value.originCity,
      destinationCity: value.destinationCity,
      shipmentType: value.shipmentType,
      parcelCategory: value.parcelCategory,
      deliveryType: value.deliveryType,
      parcelWeight: value.parcelWeight,
    });

    /* ---------------------------------------------------------------------- */
    /*                       Generate Tracking ID                             */
    /* ---------------------------------------------------------------------- */

    const trackingId = generateTrackingId();

    if (!trackingId) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate tracking ID",
      });
    }

    /* ---------------------------------------------------------------------- */
    /*                       Initial Checkpoint                               */
    /* ---------------------------------------------------------------------- */

    const initialCheckPoint = {
      location: value.originCity,

      status: "arrived",

      title: `Parcel arrived at ${value.originCity} Branch`,

      description:
        `Your parcel has arrived at ${value.originCity} Branch ` +
        `and is being processed for the next step in its journey.`,

      updatedBy: req.user?._id?.toString() || "System",
    };

    /* ---------------------------------------------------------------------- */
    /*                           Create Parcel                                */
    /* ---------------------------------------------------------------------- */

    const parcel = await Parcel.create({
      ...value,

      trackingId,

      /*
       * calculateCost() returns:
       * {
       *   type,
       *   parcelCategory,
       *   price
       * }
       */
      parcelPrice: priceInfo.price,

      checkPoints: [initialCheckPoint],

      createdBy: req.user?._id?.toString() || "System",

      updatedBy: req.user?._id?.toString() || "System",
    });

    /* ---------------------------------------------------------------------- */
    /*                            Response                                    */
    /* ---------------------------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Parcel created successfully",
      data: parcel,
    });
  } catch (error) {
    /* ---------------------------------------------------------------------- */
    /*                       Duplicate Tracking ID                            */
    /* ---------------------------------------------------------------------- */

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Tracking ID already exists. Please try again.",
      });
    }

    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                       Get Parcel By Tracking ID                            */
/* -------------------------------------------------------------------------- */

export const getParcelByTrackingId = async (req, res, next) => {
  try {
    const { trackingId } = req.params;

    const parcel = await Parcel.findOne({
      trackingId: trackingId.trim(),
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel is not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Parcel retrieved successfully",
      data: parcel,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Add Checkpoint                                   */
/* -------------------------------------------------------------------------- */

export const addCheckPoints = async (req, res, next) => {
  try {
    const { trackingId } = req.params;

    /* ---------------------------------------------------------------------- */
    /*                         Validate Request                               */
    /* ---------------------------------------------------------------------- */

    const { error, value } = addCheckPointSchema.validate(req.body, {
      abortEarly: true,
      stripUnknown: true,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    /* ---------------------------------------------------------------------- */
    /*                            Find Parcel                                 */
    /* ---------------------------------------------------------------------- */

    const parcel = await Parcel.findOne({
      trackingId: trackingId.trim(),
    });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel is not found.",
      });
    }
    const checkpoints = {
      ...value,
      updatedBy: req.user ? req.user.name : "system",
    };

    /* ---------------------------------------------------------------------- */
    /*                           Add Checkpoint                                */
    /* ---------------------------------------------------------------------- */

    parcel.checkPoints.push(checkpoint);

    /* ---------------------------------------------------------------------- */
    /*                         Update Parcel Audit                             */
    /* ---------------------------------------------------------------------- */

    parcel.updatedBy = req.user?._id?.toString() || "System";

    await parcel.save();

    /* ---------------------------------------------------------------------- */
    /*                            Response                                    */
    /* ---------------------------------------------------------------------- */

    return res.status(201).json({
      success: true,
      message: "Checkpoint added successfully",
      data: parcel,
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Get All Parcels                                  */
/* -------------------------------------------------------------------------- */

export const getAllParcels = async (req, res, next) => {
  try {
    /* ---------------------------------------------------------------------- */
    /*                           Query Parameters                             */
    /* ---------------------------------------------------------------------- */

    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);

    const limit = Math.min(
      Math.max(parseInt(req.query.limit, 10) || 10, 1),
      100,
    );

    const status = req.query.status?.trim();

    const search = req.query.search?.trim();

    /* ---------------------------------------------------------------------- */
    /*                              Build Query                               */
    /* ---------------------------------------------------------------------- */

    const query = {};

    /* ---------------------------------------------------------------------- */
    /*                         Status Filter                                  */
    /* ---------------------------------------------------------------------- */

    /*
     * Parcel does not have a top-level `status` field.
     *
     * Status is stored inside:
     *
     * checkPoints[].status
     *
     * Therefore we query the embedded checkpoints.
     */
    if (status) {
      const allowedStatuses = [
        "arrived",
        "in_transit",
        "delayed",
        "out_for_delivery",
        "delivered",
      ];

      if (!allowedStatuses.includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Invalid parcel status.",
        });
      }

      query["checkPoints.status"] = status;
    }

    /* ---------------------------------------------------------------------- */
    /*                         Tracking ID Search                             */
    /* ---------------------------------------------------------------------- */

    if (search) {
      query.trackingId = {
        $regex: search,
        $options: "i",
      };
    }

    /* ---------------------------------------------------------------------- */
    /*                              Pagination                                */
    /* ---------------------------------------------------------------------- */

    const skip = (page - 1) * limit;

    /* ---------------------------------------------------------------------- */
    /*                         Database Queries                               */
    /* ---------------------------------------------------------------------- */

    const [parcels, total] = await Promise.all([
      Parcel.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),

      Parcel.countDocuments(query),
    ]);

    /* ---------------------------------------------------------------------- */
    /*                         Pagination Data                                */
    /* ---------------------------------------------------------------------- */

    const totalPages = Math.ceil(total / limit);

    /* ---------------------------------------------------------------------- */
    /*                              Response                                  */
    /* ---------------------------------------------------------------------- */

    return res.status(200).json({
      success: true,

      message: "Fetched all parcel records successfully",

      data: parcels,

      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* -------------------------------------------------------------------------- */
/*                           Calculate Cost Calculator                        */
/* -------------------------------------------------------------------------- */

export const calculateCostCalculator = async (req, res, next) => {
  try {
    const { error, value } = calculateCostSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const priceInfo = calculateCost(value);
    res.status(200).json(priceInfo);
  } catch (error) {
    next(error);
  }
};
