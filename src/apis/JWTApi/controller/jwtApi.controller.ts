import logger from "../../../commonUtils/winstonLogger";
import { sendResponse } from "../../../commonUtils/sendResponse";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_CONFIG } from "../../../config/config";
const jwtAPiController = {
  async generateJwtToken(req: Request, res: Response) {
    try {
      const jwtToken = jwt.sign({}, JWT_CONFIG.JWT_SECRET, {
        expiresIn: JWT_CONFIG.JWT_TOKEN_EXPIRES_IN,
      });
      if (!jwtToken) {
        return sendResponse(
          res,
          400,
          false,
          null,
          "Error generating Jwt Token"
        );
      }
      return sendResponse(res, 200, true, jwtToken, "Token Generated successfully");
    } catch (generateJwtTokenError) {
      logger.error(
        "apis :: jwtAPiController :: generateJwtToken :: ",
        generateJwtTokenError
      );
      return sendResponse(res, 500, false, null, "Internal Server Error");
    }
  },
};
export default jwtAPiController;
