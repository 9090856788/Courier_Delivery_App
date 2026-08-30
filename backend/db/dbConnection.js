import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database Connection Successfully Established...");
  } catch (error) {
    console.error("Error connecting to the database:", error);
    throw error;
  }
};

export default dbConnection;
