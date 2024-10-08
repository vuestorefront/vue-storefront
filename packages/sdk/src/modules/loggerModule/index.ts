import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import type { Module } from "../../types";
import type { LoggerModuleConfig } from "./types";
import { wrapLogger } from "./wrapper";

export const loggerModule = (options?: LoggerModuleConfig) => {
  const logger =
    options?.handler ?? LoggerFactory.create(LoggerType.ConsolaGcp, options);

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
