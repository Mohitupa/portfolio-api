import mongoose from "mongoose";
import config from "../config";

const connectDatabase = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      throw new Error("MONGODB_URI is missing");
    }

    await mongoose.connect(config.mongoUri);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error);

    process.exit(1);
  }
};

export default connectDatabase;