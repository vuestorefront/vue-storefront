import consola from "consola";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import http, { Server } from "node:http";
import {
  HealthCheckError,
  TerminusOptions,
  createTerminus,
} from "@godaddy/terminus";
import { setTimeout } from "node:timers/promises";

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
  const app = express();

  app.use(express.json(options.bodyParser));
  app.use(
    options.cookieParser
      ? cookieParser(options.cookieParser.secret, options.cookieParser.options)
      : cookieParser()
  );
  app.use(cors(options.cors ?? defaultCorsOptions));
  app.disable("x-powered-by");

  consola.info("Middleware starting....");
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

  // This could instead be implemented as a healthcheck within terminus, but we don't want /healthz to change response if app received SIGTERM
  app.get("/healthz", (_req, res) => {
    res.end("ok");
  });

  const terminusOptions: TerminusOptions = {
    // health check options
    healthChecks: {
      verbatim: true,
      "/readyz": async () => {
        if (
          !Array.isArray(options.readinessChecks) ||
          options.readinessChecks.length === 0
        ) {
          return;
        }
        const calledReadinessChecks = options.readinessChecks.map((fn) => fn());

        const readinessErrors = (
          await Promise.allSettled(calledReadinessChecks)
        ).reduce<unknown[]>(
          (errors, settledReadinessCheck) =>
            settledReadinessCheck.status === "rejected"
              ? [...errors, settledReadinessCheck.reason]
              : errors,
          []
        );

        if (readinessErrors.length) {
          throw new HealthCheckError("Readiness check failed", readinessErrors);
        }
      },
    },
    // In case some requests are still being handled when SIGTERM was received, naively wait in hopes that they will be resolved in that time, and only then shut down the process
    beforeShutdown: () => setTimeout(10 ** 4),
    useExit0: true,
  };

  const server = http.createServer(app);
  createTerminus(server, terminusOptions);
  consola.success("Middleware created!");
  return server;
}

export { createServer };
