import xss from "xss";
import type { Request, Response, NextFunction } from "express";
import { IntegrationsLoaded } from "../../types";

export function validateParams(integrations: IntegrationsLoaded) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { method, params } = req;
    const { integrationName } = params;

    // Validate the request method
    if (method !== "GET" && method !== "POST") {
      res.status(405);
      res.send(
        `Method ${method} is not allowed. Please, use GET or POST method.`
      );

      return;
    }

    // Validate the integration
    if (!integrations || !integrations[integrationName]) {
      res.status(404);
      res.send(
        `"${integrationName}" integration is not configured. Please, check the request path or integration configuration.`
      );

      return;
    }

    // Validate & sanitize the request params
    Object.entries(params).forEach(([key, value]) => {
      req.params[key] = typeof value === "string" ? xss(value) : value;
    });

    next();
  };
}
