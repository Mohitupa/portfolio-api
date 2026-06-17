// api/index.ts

import app from "../src/app";
import connectDatabase from "../src/database";

export default async function handler(req: any, res: any) {
  await connectDatabase();

  return app(req, res);
}