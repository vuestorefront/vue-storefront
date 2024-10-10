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
      `Both 'handler' and other config options are provided to logger's configuration.
      In such case 'handler' will be used and other options will be ignored as those are
      supported only by the built-in logger.
      If you want to use other options, please remove 'handler' from the configuration.
      If you want to use your handler, please remove other options from the configuration.`
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
