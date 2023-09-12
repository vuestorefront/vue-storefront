import type { RequestHandler } from "express";
import { IntegrationsLoaded } from "../../deprecated/types";

export function prepareErrorHandler(
  integrations: IntegrationsLoaded
): RequestHandler {
  return (req, res, next) => {
    const { integrationName } = req.params;
    const { errorHandler } = integrations[integrationName];

    res.locals.errorHandler = errorHandler;

    next();
  };
}
