import type { Response, Request, NextFunction } from "express";
import { LoggerManager, wrapLogger } from "../../loggerManager";

export function prepareLogger(loggerManager: LoggerManager) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!res.locals.alokai) {
      res.locals.alokai = {};
    }
    const logger = loggerManager.get(req.params.integrationName);
    const proxiedLogger = wrapLogger(logger, (metadata) => {
      return {
        ...res.locals.alokai.metadata,
        ...metadata,
        scope: {
          ...res.locals.alokai.metadata?.scope,
          ...metadata?.scope,
        },
      };
    });
    res.locals.alokai.logger = proxiedLogger;

    next();
  };
}
