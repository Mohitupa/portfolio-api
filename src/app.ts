import express from "express";
import cors from "cors";

import routes from "./routes";
import errorHandler from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  console.log(req.method, req.originalUrl);
  next();
});

app.use("/api", routes);
app.use(errorHandler);

export default app;