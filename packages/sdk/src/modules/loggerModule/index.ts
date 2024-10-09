import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import type { Module } from "../../types";
import type { LoggerModuleConfig } from "./types";
import { injectMetadata } from "./injectMetadata";
import { isInvalidConfig } from "./utils";

export const loggerModule = (options?: LoggerModuleConfig) => {
  const logger =
    options?.handler ?? LoggerFactory.create(LoggerType.ConsolaGcp, options);

  if (isInvalidConfig(options)) {
    console.warn(
      "Both handler and options are provided to logger's options. Using handler, options will be ignored."
    );
  }

  const loggerWithMetadata = injectMetadata(logger, {
    alokai: {
      context: "storefront",
    },
  });

  return {
    connector: {
      ...loggerWithMetadata,
    },
  } satisfies Module;
};
