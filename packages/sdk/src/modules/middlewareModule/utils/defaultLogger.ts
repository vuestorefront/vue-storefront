import { LoggerFactory, LoggerType } from "@vue-storefront/logger";
import { Logger } from "../types";

const internalLogger = LoggerFactory.create(LoggerType.ConsolaGcp, {
  verbosity: "debug",
});

/**
 * Default logger for the `middlewareModule`.
 */
export const defaultLogger: Logger = {
  onRequest: ({ config, url, params }) => {
    const { pathname } = new URL(url);
    internalLogger.debug(`${config.method} ${pathname}`, {
      context: `(${typeof window === "undefined" ? "server" : "client"} side)`,
      params: JSON.stringify(params),
    });
  },
  onResponse: ({ config, url, responseTime }) => {
    const { pathname } = new URL(url);
    internalLogger.debug(
      `${config.method} ${pathname} in ${responseTime.toFixed()}ms`
    );
  },
};
