import type { RequestHandler } from "express";
import { Integrations } from "../../types";
// import { IntegrationsLoaded } from "../../deprecated/types";

export function prepareErrorHandler(
  integrations: Integrations
): RequestHandler {
  return (req, res, next) => {
    const { integrationName } = req.params;
    const { errorHandler } = integrations[integrationName];

    res.locals.errorHandler = errorHandler;

    next();
  };
}
