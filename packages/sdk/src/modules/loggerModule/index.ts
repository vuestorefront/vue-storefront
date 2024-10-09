import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import type { Module } from "../../types";
import type { LoggerModuleConfig } from "./types";
import { wrapLogger } from "./wrapper";
import { isInvalidConfig } from "./utils";

export const loggerModule = (options?: LoggerModuleConfig) => {
  const logger =
    options?.handler ?? LoggerFactory.create(LoggerType.ConsolaGcp, options);

  if (isInvalidConfig(options)) {
    console.warn(
      "Both handler and options are provided. Using handler, options will be ignored."
    );
  }

  const wrappedLogger = wrapLogger(logger, {
    alokai: {
      context: "storefront",
    },
  });

  return {
    connector: {
      ...wrappedLogger,
    },
  } satisfies Module;
};
