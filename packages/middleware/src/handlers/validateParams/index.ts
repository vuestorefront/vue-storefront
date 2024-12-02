import xss from "xss";
import type { Request, Response, NextFunction } from "express";
import { IntegrationsLoaded } from "../../types";

export function validateParams(integrations: IntegrationsLoaded) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validate & sanitize the request params
    Object.entries(req.params).forEach(([key, value]) => {
      req.params[key] = typeof value === "string" ? xss(value) : value;
    });

    // Validate the integration
    const { integrationName } = req.params;
    if (!integrations || !integrations[integrationName]) {
      res.status(404);
      res.send(
        `"${integrationName}" integration is not configured. Please, check the request path or integration configuration.`
      );

      return;
    }

    next();
  };
}
