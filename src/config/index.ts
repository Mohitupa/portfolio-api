import dotenv from "dotenv";

dotenv.config();

const config = {
  port: process.env.PORT || 5000,

  nodeEnv: process.env.NODE_ENV,

  mongoUri: process.env.MONGODB_URI,

  jwtAccessSecret:
    process.env.JWT_ACCESS_SECRET as string,

  jwtRefreshSecret:
    process.env.JWT_REFRESH_SECRET as string,

  jwtAccessExpiresIn:
    process.env.JWT_ACCESS_EXPIRES_IN as string,

  jwtRefreshExpiresIn:
    process.env.JWT_REFRESH_EXPIRES_IN as string,

  frontendUrl:
    process.env.FRONTEND_URL,

  productionFrontendUrl:
    process.env.PRODUCTION_FRONTEND_URL,
};

export default config;