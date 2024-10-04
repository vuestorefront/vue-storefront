import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import type { Module } from "../../types";
import type { LoggerModuleConfig } from "./types";

export const loggerModule = (options?: LoggerModuleConfig) => {
  const logger = LoggerFactory.create(LoggerType.ConsolaGcp, options);

  return {
    connector: {
      ...logger,
    },
  } satisfies Module;
};
