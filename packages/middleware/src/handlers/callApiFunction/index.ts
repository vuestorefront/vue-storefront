import type { Request, Response } from "express";
import { injectMetadata, getLogger } from "../../logger";

export async function callApiFunction(req: Request, res: Response) {
  const { apiFunction, args, errorHandler } = res.locals;

  try {
    const platformResponse = await apiFunction(...args);
    res.send(platformResponse);
  } catch (error) {
    const apiFunctionFromExtension = !!res.locals.apiHandlerExtension;
    const logger = injectMetadata(getLogger(res), (metadata) => ({
      ...metadata,
      scope: {
        ...metadata?.scope,
        ...(apiFunctionFromExtension
          ? { extensionName: res.locals.apiHandlerExtension }
          : {}),
        type: "endpoint",
      },
      ...(error.errorBoundary ? { errorBoundary: error.errorBoundary } : {}),
    }));
    logger.error(error);
    errorHandler(error, req, res);
  }
}
