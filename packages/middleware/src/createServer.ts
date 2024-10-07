import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import http, { Server } from "node:http";
import { createTerminus } from "@godaddy/terminus";
import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import { LoggerManager, wrapLogger } from "./loggerManager";
import { LoggerFactoryConfig } from "./types";

import { registerIntegrations } from "./integrations";
import type {
  Helmet,
  IntegrationContext,
  MiddlewareConfig,
  CreateServerOptions,
} from "./types";
import {
  prepareApiFunction,
  prepareErrorHandler,
  prepareArguments,
  callApiFunction,
} from "./handlers";
import { createTerminusOptions } from "./terminus";
import { prepareMetadataStorage } from "./handlers/prepareMetadataStorage";
import { prepareLogger } from "./handlers/prepareLogger";

const defaultCorsOptions: CreateServerOptions["cors"] = {
  credentials: true,
  origin: ["http://localhost:3000", "http://localhost:4000"],
};

async function createServer<
  TIntegrationContext extends Record<string, IntegrationContext>
>(
  config: MiddlewareConfig<TIntegrationContext>,
  options: CreateServerOptions = {}
): Promise<Server> {
  const loggerManager = new LoggerManager<LoggerFactoryConfig>(
    config,
    (loggerConfig) => LoggerFactory.create(LoggerType.ConsolaGcp, loggerConfig)
  );
  const rawGlobalLogger = loggerManager.getGlobal();
  const globalLogger = wrapLogger(rawGlobalLogger, () => ({
    context: "middleware",
  }));

  const app = express();

  app.use(express.json(options.bodyParser));
  app.use(
    options.cookieParser
      ? cookieParser(options.cookieParser.secret, options.cookieParser.options)
      : cookieParser()
  );
  app.use(cors(options.cors ?? defaultCorsOptions));
  app.disable("x-powered-by");

  globalLogger.info("Middleware starting....");
  const helmetOptions: Helmet = {
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
    app.use(helmet(helmetOptions));
    globalLogger.info("VSF `Helmet` middleware added");
  }

  globalLogger.info("Loading integrations...");
  const integrations = await registerIntegrations(
    app,
    config.integrations,
    loggerManager
  );
  globalLogger.notice("Integrations loaded!");

  app.post(
    "/:integrationName/:extensionName?/:functionName",
    prepareMetadataStorage,
    prepareLogger(loggerManager),
    prepareApiFunction(integrations),
    prepareErrorHandler(integrations),
    prepareArguments,
    callApiFunction
  );
  app.get(
    "/:integrationName/:extensionName?/:functionName",
    prepareMetadataStorage,
    prepareLogger(loggerManager),
    prepareApiFunction(integrations),
    prepareErrorHandler(integrations),
    prepareArguments,
    callApiFunction
  );

  // This could instead be implemented as a healthcheck within terminus, but we don't want /healthz to change response if app received SIGTERM
  app.get("/healthz", (_req, res) => {
    res.end("ok");
  });

  const server = http.createServer(app);
  createTerminus(server, createTerminusOptions(options.readinessProbes));
  globalLogger.notice("Middleware created!");
  return server;
}

export { createServer };
