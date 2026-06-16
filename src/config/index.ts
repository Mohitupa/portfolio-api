import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT,
  nodeEnv: process.env.NODE_ENV,
  mongoUri: process.env.MONGODB_URI,
};

export default config;