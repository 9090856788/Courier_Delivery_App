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

    const admin = await User.findOne({
      email: ADMIN_EMAIL,
    });

    if (admin) {
      console.log("Admin already exists.");
      await mongoose.disconnect();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(ADMIN_PASSWORD, 10);

    await User.create({
      name: ADMIN_NAME,
      email: ADMIN_EMAIL,
      password: hashedPassword,
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
