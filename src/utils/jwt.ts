import jwt, { Secret, SignOptions } from "jsonwebtoken";

import config from "../config";

export const createAccessToken = (
  payload: object
) => {

  return jwt.sign(
    payload,
    config.jwtAccessSecret,
    {
      expiresIn:
        config.jwtAccessExpiresIn  as SignOptions["expiresIn"],
    }
  );
};

export const createRefreshToken = (
  payload: object
) => {

  return jwt.sign(
    payload,
    config.jwtRefreshSecret,
    {
      expiresIn:
        config.jwtRefreshExpiresIn  as SignOptions["expiresIn"],
    }
  );
};

export const verifyRefreshToken = (
  token: string
) => {

  return jwt.verify(
    token,
    config.jwtRefreshSecret
  );
};