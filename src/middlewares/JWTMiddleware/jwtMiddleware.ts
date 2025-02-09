import { Request, Response, NextFunction } from "express";
import { sendResponse } from "../../commonUtils/sendResponse";
import logger from "../../commonUtils/winstonLogger";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { JWT_CONFIG } from "../../config/config";
export const JwtMiddleWare = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.header("Authorization")?.split(" ")[1];
      if (!token) {
        return sendResponse(res, 401, false, null, "Unauthorized access");
      }
      const decodeToken = jwt.verify(token, JWT_CONFIG.JWT_SECRET);
      req.user = decodeToken;
      next()
    } catch (verifyTokenError) {
      logger.error(
        "middlewares :: jwtMiddlewares :: verifyTokenError :: ",
        verifyTokenError
      );
      if (verifyTokenError instanceof TokenExpiredError) {
        return sendResponse(res, 401, false, null, "Unauthorized: Token has expired.");
      } else if (verifyTokenError instanceof JsonWebTokenError) {
        return sendResponse(res, 401, false, null, "Unauthorized access");
      } else {
        return sendResponse(res, 500, false, null, "Internal Server Error");
      }
    }
  };
};
