import type { Response } from "express";
import { LoggerInterface } from "@vue-storefront/logger";
import type {
  AlokaiContainer,
  IntegrationContext,
  MiddlewareConfig,
} from "./types";

type LoggerInstance = LoggerInterface;
const GLOBAL_MIDDLEWARE_CFG_KEY = Symbol("GLOBAL_MIDDLEWARE_CFG_KEY");
export class LoggerManager<
  TLoggerConfig = any,
  TIntegrationContext extends Record<string, IntegrationContext> = any
> {
  private instances: Record<string | symbol, LoggerInstance> = {};

  /** Creating minimal amount of needed Logger instances * */
  constructor(
    config: MiddlewareConfig<TIntegrationContext>, // Whole middleware.config.js object
    buildLogger: (logger: TLoggerConfig) => LoggerInstance
  ) {
    // Global Logger
    this.instances[GLOBAL_MIDDLEWARE_CFG_KEY] = buildLogger(
      config.logger as TLoggerConfig // logger is on same level as integrations
    );
    // Logger for every integration having custom logger config
    for (const [integrationName, integrationEntry] of Object.entries(
      config.integrations
    )) {
      if (this.hasCustomLoggerConfig(integrationEntry)) {
        // every integration inside `configuration` object can have own logger too
        this.instances[integrationName] = buildLogger(
          integrationEntry.logger as TLoggerConfig
        );
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  private hasCustomLoggerConfig(integrationEntry) {
    return Boolean(integrationEntry.logger);
  }

  // getting reference to instance of logger by integration tag name
  public get(integrationName) {
    return (
      this.instances[integrationName] ||
      this.instances[GLOBAL_MIDDLEWARE_CFG_KEY]
    );
  }

  // getting reference to global instance of logger
  public getGlobal() {
    return this.instances[GLOBAL_MIDDLEWARE_CFG_KEY];
  }
}

export function getLogger(
  source: AlokaiContainer | Response | { res: Response }
): LoggerInstance {
  if (!source) {
    throw new Error("Parameter for getLogger function not provided");
  }
  if ("logger" in source) {
    return source.logger;
  }
  let base: Response;
  if ("res" in source) {
    base = source.res;
  } else {
    base = source;
  }
  return base.locals.alokai.logger;
}

const methodsToOverwrite = [
  "emergency",
  "alert",
  "critical",
  "error",
  "warning",
  "notice",
  "info",
  "debug",
];

export function wrapLogger(
  logger: LoggerInstance,
  metadataGetter: (metadata: Record<string, any>) => Record<string, any>
): LoggerInstance {
  return new Proxy(logger, {
    get(target, prop) {
      if (
        typeof target[prop] === "function" &&
        methodsToOverwrite.includes(prop as string)
      ) {
        return (...args: any[]) => {
          const [message, metadata] = args;
          target[prop](message, {
            ...metadata,
            ...metadataGetter(metadata),
          });
        };
      }
      return target[prop];
    },
  });
}
