import type { Response, Request, NextFunction } from "express";
import { LoggerManager, injectMetadata } from "../../logger";

export function prepareLogger(loggerManager: LoggerManager) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!res.locals) {
      res.locals = {};
    }
    if (!res.locals.alokai) {
      res.locals.alokai = {};
    }
    const logger = loggerManager.get(req?.params?.integrationName);
    if (!req?.params?.integrationName) {
      console.error("prepareLogger middleware used for unsupported route");
    }
    const { integrationName, functionName } = req.params;

    const loggerWithMetadata = injectMetadata(logger, (metadata) => {
      return {
        context: "middleware",
        ...metadata,
        scope: {
          integrationName,
          functionName,
          ...metadata?.scope,
        },
      };
    });
    res.locals.alokai.logger = loggerWithMetadata;

    next();
  };
}
