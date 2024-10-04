import type { Response, NextFunction } from "express";
import { RequestWithAlokai } from "../../types";
import { LoggersManager, wrapLogger } from "../../loggerManager";

export function prepareLogger(loggersManager: LoggersManager) {
  return function (req: RequestWithAlokai, res: Response, next: NextFunction) {
    if (!res.locals.alokai) {
      res.locals.alokai = {};
    }
    const logger = loggersManager.get(req.params.integrationName);
    const proxiedLogger = wrapLogger(logger, () => res.locals.alokai.metadata);
    res.locals.alokai.logger = proxiedLogger;

    next();
  };
}
