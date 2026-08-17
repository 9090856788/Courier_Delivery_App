import joi from "joi";

// Login validation
export const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
});

// Register user validation
export const registerSchema = joi.object({
  name: joi.string().min(5).max(100).required(),
  email: joi.string().email().required(),
  password: joi.string().min(5).max(15).required(),
});

// Checkpoint validation
export const checkPointSchema = joi.object({
  location: joi.string().trim().required(),

  title: joi.string().trim().required(),

  description: joi.string().trim().allow(""),

  status: joi
    .string()
    .valid("arrived", "in_transit", "delayed", "out_for_delivery", "delivered")
    .required(),

  updatedBy: joi.string().trim().required(),
});

// Create Parcel validation
export const createParcelSchema = joi.object({
  trackingId: joi.string().trim().required(),

  senderName: joi.string().trim().required(),

  senderPhoneNumber: joi.string().trim().required(),

  senderAddress: joi.string().trim().required(),

  receiverName: joi.string().trim().required(),

  receiverPhoneNumber: joi.string().trim().required(),

  receiverAddress: joi.string().trim().required(),

  checkPoints: joi.array().items(checkPointSchema).default([]),

  originCity: joi.string().trim().required(),

  destinationCity: joi.string().trim().required(),

  shipmentType: joi.string().valid("National", "International").required(),

  parcelCategory: joi
    .string()
    .valid(
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
    )
    .required(),

  deliveryType: joi
    .string()
    .valid("standard", "express", "same_day", "overnight")
    .required(),

  parcelWeight: joi.number().min(0).required(),

  parcelPrice: joi.number().min(0).required(),

  parcelSize: joi.string().valid("small", "medium", "large").required(),

  parcelDescription: joi.string().trim().allow(""),

  deliveryDate: joi.date().required(),

  createdBy: joi.string().trim().required(),

  updatedBy: joi.string().trim().required(),
});
