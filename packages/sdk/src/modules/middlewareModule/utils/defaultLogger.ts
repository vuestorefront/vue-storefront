import { Logger } from "../types";

/**
 * Default logger for the `middlewareModule`.
 */
export const defaultLogger: Logger = {
  onRequest: ({ config, url, params }) => {
    const { pathname } = new URL(url);
    // eslint-disable-next-line no-console
    console.log(
      `${config.method} ${pathname}`,
      `(${typeof window === "undefined" ? "server" : "client"} side)`,
      JSON.stringify(params)
    );
  },
  onResponse: ({ config, url, responseTime }) => {
    const { pathname } = new URL(url);
    // eslint-disable-next-line no-console
    console.log(`${config.method} ${pathname} in ${responseTime.toFixed()}ms`);
  },
};
