import mongoose from "mongoose";

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
  },
  {
    timestamps: {
      type: Date,
      default: Date.now,
    },
    updatedBy: {
      type: String,
      required: true,
      trim: true,
    },
  },
);

export const CheckPoint = mongoose.model("checkPoint", checkPointSchema);

const parcelSchema = new mongoose.Schema(
  {
    trackingId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
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
    status: {
      type: String,
      enum: [
        "pending",
        "in_transit",
        "delayed",
        "out_for_delivery",
        "delivered",
      ],
      default: "pending",
    },
    checkPoints: [checkPointSchema],
    parcelType: {
      type: String,
      enum: ["National", "International"],
      required: true,
    },
    deliveryType: {
      type: String,
      enum: ["standard", "express", "same_day"],
      required: true,
    },
    parcelSize: {
      type: String,
      enum: ["small", "medium", "large"],
      required: true,
    },
    parcelCategory: {
      type: String,
      enum: ["documents", "electronics", "clothing", "other"],
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

export const Parcel = mongoose.model("parcel", parcelSchema);
