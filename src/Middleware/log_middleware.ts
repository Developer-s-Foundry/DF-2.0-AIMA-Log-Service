import {Request, Response, NextFunction } from "express";
import { LogError } from "../common/types/error_types";
import { createHmac } from "crypto";
import { APP_CONFIGS } from "../common/config";
import { parseTimestamp } from "../common/utils/helper_func";


export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {

  // also verify that the user is authenticated
  if (!req.headers['X-logservice-timestamp'] || !req.headers['X-logservice-signature'])  {
    throw new LogError('credentials not found', 400);
  }
  const recievedTimestamp = req.headers['X-logservice-timestamp'];
  const signature = req.headers['X-logservice-signature'];
  const normaliseTimestamp = Array.isArray(recievedTimestamp) ? recievedTimestamp.join('') : recievedTimestamp

  const verifySignature = createHmac("sha256", APP_CONFIGS.GATEWAY_SECRET_KEY )
                         .update(normaliseTimestamp)
                         .digest("hex");

    if (signature !== verifySignature) {
      throw new LogError('unathorised to access this resource', 403)
    }

    const modTimestamp = parseTimestamp(normaliseTimestamp, 30) 
    const currentTimestamp = Date.now()  
    if (modTimestamp < currentTimestamp )  {
      throw new LogError('your time has expired', 403)
    } 

    next();
}

