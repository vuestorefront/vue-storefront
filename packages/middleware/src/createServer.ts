import consola from "consola";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import express from "express";
import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import { registerIntegrations } from "./integrations";
import type { Helmet, IntegrationContext, MiddlewareConfig } from "./types";
import {
  prepareApiFunction,
  prepareErrorHandler,
  prepareArguments,
  callApiFunction,
} from "./handlers";

async function createServer<
  TIntegrationContext extends Record<string, IntegrationContext>
>(config: MiddlewareConfig<TIntegrationContext>): Promise<Express> {
  const app = express();

  app.use(express.json());
  app.use(cookieParser());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.disable("x-powered-by");

  consola.info("Middleware starting....");
  const options: Helmet = {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: "none",
    },
    ...((config.helmet || {}) as HelmetOptions),
  };
  const isHelmetEnabled =
    config.helmet === true ||
    (config.helmet && Object.keys(config.helmet).length > 0);
  if (isHelmetEnabled) {
    app.use(helmet(options));
    consola.info("VSF `Helmet` middleware added");
  }

  consola.info("Loading integrations...");
  const integrations = await registerIntegrations(app, config.integrations);
  consola.success("Integrations loaded!");

  app.post(
    "/:integrationName/:extensionName?/:functionName",
    prepareApiFunction(integrations),
    prepareErrorHandler(integrations),
    prepareArguments,
    callApiFunction
  );
  app.get(
    "/:integrationName/:extensionName?/:functionName",
    prepareApiFunction(integrations),
    prepareErrorHandler(integrations),
    prepareArguments,
    callApiFunction
  );

  app.get("/healthz", (_req, res) => {
    res.end("ok");
  });

  consola.success("Middleware created!");
  return app;
}

export { createServer };
