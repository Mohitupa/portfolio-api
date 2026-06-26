import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

export const auth = (
  ...requiredPermissions: string[]
) => {

  return (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {

    const token =
      req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    try {

      const decoded =
        jwt.verify(
          token,
          config.jwtAccessSecret
        ) as {
          userId: string;
          email: string;
          roles: string[];
          permissions: string[];
        };

      req.user = decoded;

      if (
        requiredPermissions.length &&
        !requiredPermissions.every(permission =>
          decoded.permissions.includes(permission)
        )
      ) {
        return res.status(403).json({
          success: false,
          message: "Forbidden",
        });
      }

      next();

    } catch {

      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });

    }
  };
};