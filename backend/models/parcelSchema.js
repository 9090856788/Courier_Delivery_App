import mongoose from "mongoose";

/* -------------------------------------------------------------------------- */
/*                           Checkpoint Schema                                */
/* -------------------------------------------------------------------------- */

const checkPointSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: [
        "arrived",
        "in_transit",
        "delayed",
        "out_for_delivery",
        "delivered",
      ],
      required: true,
    },

    updatedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const CheckPoint = mongoose.model("CheckPoint", checkPointSchema);

/* -------------------------------------------------------------------------- */
/*                             Parcel Schema                                  */
/* -------------------------------------------------------------------------- */

const parcelSchema = new mongoose.Schema(
  {
    /* ---------------------------------------------------------------------- */
    /*                            Tracking                                     */
    /* ---------------------------------------------------------------------- */

    trackingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                              Sender                                     */
    /* ---------------------------------------------------------------------- */

    senderName: {
      type: String,
      required: true,
      trim: true,
    },

    senderPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    senderAddress: {
      type: String,
      required: true,
      trim: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                             Receiver                                    */
    /* ---------------------------------------------------------------------- */

    receiverName: {
      type: String,
      required: true,
      trim: true,
    },

    receiverPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    receiverAddress: {
      type: String,
      required: true,
      trim: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                            Checkpoints                                  */
    /* ---------------------------------------------------------------------- */

    checkPoints: {
      type: [checkPointSchema],
      default: [],
    },

    /* ---------------------------------------------------------------------- */
    /*                              Route                                      */
    /* ---------------------------------------------------------------------- */

    originCity: {
      type: String,
      required: true,
      trim: true,
    },

    destinationCity: {
      type: String,
      required: true,
      trim: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                           Shipment Info                                 */
    /* ---------------------------------------------------------------------- */

    shipmentType: {
      type: String,
      enum: ["National", "International"],
      required: true,
    },

    parcelCategory: {
      type: String,
      enum: [
        "documents",
        "electronics",
        "clothing",
        "fragile",
        "food",
        "medicine",
        "cosmetics",
        "books",
        "small_package",
        "large_package",
        "other",
      ],
      required: true,
    },

    deliveryType: {
      type: String,
      enum: ["standard", "sameDay", "overnight"],
      required: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                            Parcel Details                               */
    /* ---------------------------------------------------------------------- */

    parcelWeight: {
      type: Number,
      required: true,
      min: 0,
    },

    parcelPrice: {
      type: Number,
      required: true,
      min: 0,
    },

    parcelSize: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },

    parcelDescription: {
      type: String,
      trim: true,
    },

    deliveryDate: {
      type: Date,
      required: true,
    },

    /* ---------------------------------------------------------------------- */
    /*                              Audit                                      */
    /* ---------------------------------------------------------------------- */

    createdBy: {
      type: String,
      required: true,
      trim: true,
    },

    updatedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Parcel = mongoose.model("Parcel", parcelSchema);
