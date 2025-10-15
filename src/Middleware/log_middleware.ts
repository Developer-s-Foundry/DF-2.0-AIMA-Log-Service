import {Request, Response, NextFunction } from "express";
import { LogError } from "../common/types/error_types";


export const logMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // also verify that the user is authenticated
  if (!req.headers['X-logservice-timestamp'] || !req.headers['X-logservice-signature'])  {
    throw new LogError('credentials not found', 400)
  }
  const timestamp = req.headers['X-logservice-timestamp']
  const signature = req.headers['X-logservice-signature']

}