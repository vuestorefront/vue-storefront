import consola from "consola";
import cookieParser from "cookie-parser";
import cors from "cors";
import type { Express } from "express";
import express from "express";
import type { HelmetOptions } from "helmet";
import helmet from "helmet";
import { registerIntegrations } from "./integrations";
// import type { Helmet, IntegrationContext, MiddlewareConfig } from "./deprecated/types";
import {
  prepareApiFunction,
  prepareErrorHandler,
  prepareArguments,
  callApiFunction,
} from "./handlers";
import { CreateServerParams } from "./types";

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

async function createServer(config: CreateServerParams): Promise<Express> {
  consola.info("Middleware starting....");
  const helmetOptions = config.helmet || config.helmet || {};
  const options = {
    contentSecurityPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginEmbedderPolicy: false,
    permittedCrossDomainPolicies: {
      permittedPolicies: "none",
    },
    ...(helmetOptions as HelmetOptions),
  };
  const isHelmetEnabled =
    helmetOptions === true ||
    (helmetOptions && Object.keys(helmetOptions).length > 0);
  if (isHelmetEnabled) {
    app.use(helmet(options));
    consola.info("VSF `Helmet` middleware added");
  }

  consola.info("Loading integrations...");
  const integrations = await registerIntegrations(app, config.integrations);
  consola.success("Integrations loaded!");

  app.post(
    "/:integrationName/:functionName",
    prepareApiFunction(integrations),
    prepareErrorHandler(integrations),
    prepareArguments,
    callApiFunction
  );
  app.get(
    "/:integrationName/:functionName",
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
