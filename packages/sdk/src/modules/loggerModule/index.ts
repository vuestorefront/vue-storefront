import {
  LoggerFactory,
  LoggerOptions,
  LoggerType,
} from "@vue-storefront/logger";
import type { Module } from "../../types";

export const loggerModule = (options?: LoggerOptions) => {
  const logger = LoggerFactory.create(LoggerType.ConsolaGcp, options);

  return {
    connector: {
      ...logger,
    },
  } satisfies Module;
};
