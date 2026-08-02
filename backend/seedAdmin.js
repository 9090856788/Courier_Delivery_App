import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "./models/userSchema.js";
import dbConnection from "./db/dbConnection.js";

const seedAdmin = async () => {
  try {
    await dbConnection();

    const { ADMIN_NAME, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
    const normalizedEmail = (ADMIN_EMAIL || "").trim().toLowerCase();

    const admin = await User.findOne({ email: normalizedEmail });

    if (admin) {
      await User.deleteOne({ _id: admin._id });
      console.log("Existing admin removed.");
    }

    await User.create({
      name: ADMIN_NAME,
      email: normalizedEmail,
      password: ADMIN_PASSWORD,
      role: "admin",
    });

    console.log("Admin created successfully.");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
