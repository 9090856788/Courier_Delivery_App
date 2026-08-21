import { Parcel } from "../models/parcelSchema.js";
import { calculateCost } from "../services/calculateCost.js";
import { generateTrackingId } from "../services/generateTrackingId.js";
import {
  addCheckPointSchema,
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
      parcelPrice: priceInfo.parcelPrice,
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

export const getParcelByTrackingId = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
    const parcel = await Parcel.findOne({ trackingId });

    if (!parcel) {
      return res.status(404).json({
        success: false,
        message: "Parcel is not found.",
      });
    }
    res.status(200).json({
      success: true,
      message: "Parcel retrieved successfully",
      data: parcel,
    });
  } catch (error) {
    next(error);
  }
};

export const addCheckPoints = async (req, res, next) => {
  try {
    const { trackingId } = req.params;
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

    parcel.checkPoints.push(checkpoints);
    await parcel.save();

    return res.status(201).json({
      success: true,
      message: "Checkpoint added successfully",
      data: parcel,
    });
  } catch (error) {
    next(error);
  }
};
