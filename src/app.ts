import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";
import path from "path";

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

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