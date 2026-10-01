import mongoose from "mongoose";

const dbConnection = async () => {
  mongoose.set("bufferCommands", false);
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) {
    console.log("[DB] No MONGO_URI provided — using in-memory mock database store.");
    return;
  }
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 2000 });
    console.log("[DB] Database Connection Successfully Established...");
  } catch (error) {
    console.warn("[DB] MongoDB not connected (" + error.message + ") — using in-memory mock database store.");
  }
};

export default dbConnection;
