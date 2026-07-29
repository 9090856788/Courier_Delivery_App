import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import { loginSchema, registerSchema } from "../validations/validations.js";

// Generate json web token
const generateToken = (userId) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn,
  });
};

// Register user api endpoints
export const registerUser = async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    const { error, value } = registerSchema.validate({
      ...req.body,
      email: normalizedEmail,
    });
    const { name, email, password } = value;
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message || "There is some error occurs",
      });
    }
    const existUser = await User.findOne({ email });
    if (existUser) {
      return res.status(400).json({
        success: false,
        message: "User already exist",
      });
    }
    const user = await User.create({ name, email, password });
    res.status(201).json({
      success: true,
      message: "User Created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

// login user api endpoints
export const loginUser = async (req, res, next) => {
  try {
    const normalizedEmail = req.body.email?.trim().toLowerCase();
    const { error, value } = loginSchema.validate({
      ...req.body,
      email: normalizedEmail,
    });
    const { email, password } = value;
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message || "There is some error occurs",
      });
    }
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `No user found for email: ${email}`,
      });
    }
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: `Password mismatch for email: ${email}`,
      });
    }
    const token = generateToken(user._id);
    const cookieDays = Number(
      process.env.COOKIE_EXPIRES_IN || process.env.COOKIE_EXPIRE || 7,
    );
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + cookieDays * 24 * 60 * 60 * 1000),
      })
      .json({
        success: true,
        message: "User is Logged in Successfully",
        user,
        token,
      });
  } catch (error) {
    next(error);
  }
};
// verify email user api endpoints

// forgot password api endpoints

// reset password api endpoints
