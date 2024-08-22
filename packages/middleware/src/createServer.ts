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
  TerminusState,
  createTerminus,
} from "@godaddy/terminus";
import * as v8 from "node:v8";

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

  // This could be a healthcheck within terminus, but we don't want /healthz to change response if app received SIGTERM
  app.get("/healthz", (_req, res) => {
    res.end("ok");
  })

  const terminusOptions: TerminusOptions = {
    // health check options
    healthChecks: {
      verbatim: true,
      "/readyz": async () => {
        const errors = options.readinessChecks?.reduce<Error[]>((acc, currentReadinessCheckFn) => {
          try {
            currentReadinessCheckFn();
            return acc;
          } catch (e) {
            return [...acc, e];
          }
        }, []);
	if (errors.length) {
	  consola.log(errors)
	  throw new HealthCheckError('healthecheck failed', errors)
	}
      },
    },
    beforeShutdown: () => {
      return new Promise(r => setTimeout(r, 10**4))
    },
    useExit0: true,
    // unsafeExposeStackTraces: true // [optional = false] return stack traces in error response if healthchecks throw errors
    //  },
    // caseInsensitive,                  // [optional] whether given health checks routes are case insensitive (defaults to false)
    // statusOk,                         // [optional = 200] status to be returned for successful healthchecks
    // statusOkResponse,                 // [optional = { status: 'ok' }] status response to be returned for successful healthchecks
    // statusError,                      // [optional = 503] status to be returned for unsuccessful healthchecks
    // statusErrorResponse,              // [optional = { status: 'error' }] status response to be returned for unsuccessful healthchecks
    // // cleanup options
    // timeout: 1000,                    // [optional = 1000] number of milliseconds before forceful exiting
    // signal,                           // [optional = 'SIGTERM'] what signal to listen for relative to shutdown
    // signals,                          // [optional = []] array of signals to listen for relative to shutdown
    // useExit0,                         // [optional = false] instead of sending the received signal again without beeing catched, the process will exit(0)
    // sendFailuresDuringShutdown,       // [optional = true] whether or not to send failure (503) during shutdown
    // beforeShutdown,                   // [optional] called before the HTTP server starts its shutdown
    // onSignal,                         // [optional] cleanup function, returning a promise (used to be onSigterm)
    // onShutdown,                       // [optional] called right before exiting
    // onSendFailureDuringShutdown,      // [optional] called before sending each 503 during shutdowns
    // both
    // logger                            // [optional] logger function to be called with errors. Example logger call: ('error happened during shutdown', error). See terminus.js for more details.
  };

  const server = http.createServer(app);
  createTerminus(server, terminusOptions);
  consola.success("Middleware created!");
  return server;
}

export { createServer };
