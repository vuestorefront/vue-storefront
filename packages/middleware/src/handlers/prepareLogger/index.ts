import type { Response, Request, NextFunction } from "express";
import { LoggersManager, wrapLogger } from "../../loggerManager";

export function prepareLogger(loggersManager: LoggersManager) {
  return function (req: Request, res: Response, next: NextFunction) {
    if (!res.locals.alokai) {
      res.locals.alokai = {};
    }
    const logger = loggersManager.get(req.params.integrationName);
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
