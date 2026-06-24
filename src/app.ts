import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import path from "path";
import { apiLimiter }
  from "./middlewares/rateLimiter";
import config from "./config";

const app = express();

const allowedOrigins = [
  config.frontendUrl,
  config.productionFrontendUrl,
].filter(Boolean) as string[];

app.disable("etag");
app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(
        new Error("CORS not allowed")
      );
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(apiLimiter);

console.log(
  path.join(
    process.cwd(),
    "uploads"
  )
);

app.use((req, _res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log(req.method, req.originalUrl);
  next();
});

app.use(
  "/uploads",
  express.static(
    path.join(
      process.cwd(),
      "uploads"
    )
  )
);

app.use("/api", routes);
app.use(errorHandler);

export default app;