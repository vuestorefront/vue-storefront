import type { Request, NextFunction } from "express";
import { LoggerManager, injectMetadata } from "../../logger";
import { ResponseWithAlokaiLocals } from "../../types";

export function prepareLogger(loggerManager: LoggerManager) {
  return function (
    req: Request,
    res: ResponseWithAlokaiLocals,
    next: NextFunction
  ) {
    if (!res.locals) {
      res.locals = {};
    }
    const logger = loggerManager.get(req?.params?.integrationName);
    if (!req?.params?.integrationName) {
      console.error("prepareLogger middleware used for unsupported route");
    }
    const { integrationName, functionName } = req.params;

    const loggerWithMetadata = injectMetadata(logger, (metadata) => {
      return {
        alokai: {
          context: "middleware",
          scope: {
            integrationName,
            functionName,
            ...metadata?.alokai?.scope,
          },
        },
      };
    });
    if (!res.locals.alokai) {
      res.locals.alokai = {
        logger: loggerWithMetadata,
      };
    } else {
      res.locals.alokai.logger = loggerWithMetadata;
    }

    next();
  };
}
