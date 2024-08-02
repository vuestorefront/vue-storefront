import type { Request, Response } from "express";
import { Severity } from "@vue-storefront/logger";
import { logger } from "../../logger";

export async function callApiFunction(req: Request, res: Response) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    logger.log(error, Severity.ERROR);
    errorHandler(error, req, res);
  }
}
