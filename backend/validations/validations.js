import joi from "joi";

// login Validation
export const loginSchema = joi.object({
  email: joi.string().email.required(),
  password: joi.string().min(6).required(),
});

// register user validation
export const registerSchema = joi.object({
  name: joi.string().min(5).max(100).required(),
  email: joi.string().email.required(),
  password: joi.string().min(5).max(15).required(),
});
