import { Request, Response, NextFunction } from "express";
import { ZodSchema, ZodError } from "zod";

const validateRequest =
  (schema: ZodSchema) =>
  (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const parsed = schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      }) as {
        params?: Request["params"];
        query?: Request["query"];
        body?: Request["body"];
      };

      if (parsed.params) req.params = parsed.params;
      if (parsed.query) req.query = parsed.query;
      if (parsed.body) req.body = parsed.body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: error.issues,
        });
      }

      next(error);
    }
  };

export default validateRequest;
