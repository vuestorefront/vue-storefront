import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import http, { Server } from "node:http";
import { createTerminus } from "@godaddy/terminus";
import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import { registerIntegrations } from "./integrations";
import type {
  LoggerOptions,
  Helmet,
  IntegrationContext,
  MiddlewareConfig,
  CreateServerOptions,
} from "./types";
import { LoggerManager, injectMetadata, lockLogger } from "./logger";

import {
  prepareApiFunction,
  prepareErrorHandler,
  prepareArguments,
  callApiFunction,
  validateParams,
} from "./handlers";
import { createTerminusOptions } from "./terminus";
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
  const loggerManager = new LoggerManager<LoggerOptions>(
    config,
    (loggerConfig) =>
      lockLogger(LoggerFactory.create(LoggerType.ConsolaGcp, loggerConfig))
  );
  const logger = injectMetadata(loggerManager.get(), () => ({
    alokai: {
      context: "middleware",
    },
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

  logger.info("Middleware starting....");
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
    logger.debug("VSF `Helmet` middleware added");
  }

  logger.debug("Loading integrations...");
  const integrations = await registerIntegrations(
    app,
    config.integrations,
    loggerManager
  );
  logger.debug("Integrations loaded!");

  app.all(
    "/:integrationName/:extensionName?/:functionName",
    validateParams(integrations),
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
  logger.info("Middleware created!");
  return server;
}

export { createServer };
