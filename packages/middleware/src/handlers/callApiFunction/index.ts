import type { Request, Response } from "express";
import { getLogger } from "../../logger";

export async function callApiFunction(req: Request, res: Response) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    const logger = getLogger(res);
    const additionalScope = res.locals.fnOrigin
      ? { extensionName: res.locals.fnOrigin }
      : {};
    const errorBoundary = error.errorBoundary
      ? { errorBoundary: error.errorBoundary }
      : {};

    logger.error(error, {
      scope: {
        type: "endpoint",
        ...additionalScope,
      },
      ...errorBoundary,
    });
    errorHandler(error, req, res);
  }
}
