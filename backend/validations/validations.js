import joi from "joi";

/* -------------------------------------------------------------------------- */
/*                              Login Validation                             */
/* -------------------------------------------------------------------------- */

export const loginSchema = joi.object({
  email: joi.string().email().required(),

  password: joi.string().min(6).required(),
});

/* -------------------------------------------------------------------------- */
/*                            Register Validation                             */
/* -------------------------------------------------------------------------- */

export const registerSchema = joi.object({
  name: joi.string().trim().min(5).max(100).required(),

  email: joi.string().email().required(),

  password: joi.string().min(5).max(15).required(),
});

/* -------------------------------------------------------------------------- */
/*                           Checkpoint Validation                            */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                         Create Parcel Validation                           */
/* -------------------------------------------------------------------------- */

export const createParcelSchema = joi.object({
  /* ------------------------------------------------------------------------ */
  /*                              Sender                                      */
  /* ------------------------------------------------------------------------ */

  senderName: joi.string().trim().min(2).max(100).required(),

  senderPhoneNumber: joi.string().trim().required(),

  senderAddress: joi.string().trim().min(5).max(300).required(),

  /* ------------------------------------------------------------------------ */
  /*                             Receiver                                     */
  /* ------------------------------------------------------------------------ */

  receiverName: joi.string().trim().min(2).max(100).required(),

  receiverPhoneNumber: joi.string().trim().required(),

  receiverAddress: joi.string().trim().min(5).max(300).required(),

  /* ------------------------------------------------------------------------ */
  /*                               Route                                      */
  /* ------------------------------------------------------------------------ */

  originCity: joi.string().trim().min(2).max(100).required(),

  destinationCity: joi.string().trim().min(2).max(100).required(),

  /* ------------------------------------------------------------------------ */
  /*                           Shipment Information                            */
  /* ------------------------------------------------------------------------ */

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
    .valid("standard", "sameDay", "overnight")
    .required(),

  /* ------------------------------------------------------------------------ */
  /*                            Parcel Details                                */
  /* ------------------------------------------------------------------------ */

  parcelWeight: joi.number().positive().required(),

  parcelSize: joi.string().valid("small", "medium", "large").required(),

  parcelDescription: joi.string().trim().max(500).allow("", null),

  deliveryDate: joi.date().iso().required(),
});

/* -------------------------------------------------------------------------- */
/*                       Add Checkpoint Validation                            */
/* -------------------------------------------------------------------------- */

export const addCheckPointSchema = joi.object({
  location: joi.string().trim().min(3).max(100).required(),
  title: joi.string().trim().min(3).max(150).required(),
  description: joi.string().trim().max(500).allow("", null).optional(),
  status: joi
    .string()
    .valid("arrived", "in_transit", "delayed", "out_for_delivery", "delivered")
    .required(),
});

export const calculateCostSchema = joi.object({
  originCity: joi.string().trim().min(2).max(100).required(),
  destinationCity: joi.string().trim().min(2).max(100).required(),
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
    .valid("standard", "sameDay", "overnight")
    .required(),
  parcelWeight: joi.number().positive().required(),
});
