import type { Request } from "express";
import { LogScope } from "../../types";
import { getLogger, injectMetadata } from "../../logger";
import type { ResponseWithAlokaiLocals } from "../../types";

export async function callApiFunction(
  req: Request,
  res: ResponseWithAlokaiLocals
) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    const additionalScope = res.locals.fnOrigin
      ? { extensionName: res.locals.fnOrigin }
      : {};
    const errorBoundary = error.errorBoundary
      ? { errorBoundary: error.errorBoundary as LogScope }
      : {};
    const logger = injectMetadata(getLogger(res), () => ({
      alokai: {
        scope: {
          type: "endpoint" as const,
          ...additionalScope,
        },
        ...errorBoundary,
      },
    }));

    logger.error(error);
    errorHandler(error, req, res);
  }
}
