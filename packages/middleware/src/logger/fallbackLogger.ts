import { LoggerFactory, LoggerType } from "@vue-storefront/logger";

import { injectMetadata, lockLogger } from "./injectMetadata";

/**
 * This logger is used as a fallback logger in case of any error during the
 * initialization of the logger. It is used to log the error and provide a
 * default logger for the application. It should not be used as a primary
 * logger.
 */
const fallbackLogger = injectMetadata(
  lockLogger(LoggerFactory.create(LoggerType.ConsolaGcp)),
  () => ({
    alokai: {
      context: "middleware",
    },
  })
);

export { fallbackLogger };
