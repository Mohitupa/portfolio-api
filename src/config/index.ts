import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV,

  mongoUri: process.env.MONGODB_URI,

  jwtSecret: process.env.JWT_SECRET as string,

  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};

export default config;