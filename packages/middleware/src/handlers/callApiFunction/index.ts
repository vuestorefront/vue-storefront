import type { Request, Response } from "express";
import { getLogger } from "../../logger";

export async function callApiFunction(req: Request, res: Response) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    const logger = getLogger(res);
    logger.error(error);
    errorHandler(error, req, res);
  }
}
