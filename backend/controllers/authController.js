import jwt from "jsonwebtoken";
import User from "../models/userSchema";
import { loginSchema } from "../validations/validations";

// Generate json web token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register user api endpoints

// login user api endpoints
export const userLogin = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    const { email, password } = value;
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message || "There is some error occurs",
      });
    }
    const user = await User.findOne("email");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }
    const isPasswordMatch = await comparePassword(password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }
    const token = generateToken(user._id);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
        ),
      })
      .json({
        success: true,
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
