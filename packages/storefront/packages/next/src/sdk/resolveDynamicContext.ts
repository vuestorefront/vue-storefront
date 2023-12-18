/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { DynamicContext, GetSdkContext } from "./types";

export type { CreateSdkOptions } from "./types";

const BLACKLISTED_HEADERS = ["host"];

function isAppRouterHeaders(
  headers: ReturnType<GetSdkContext["getRequestHeaders"]>
): headers is Headers {
  return headers && "entries" in headers;
}

export function resolveDynamicContext(context: GetSdkContext): DynamicContext {
  return {
    ...context,
    getRequestHeaders() {
      const headers = context.getRequestHeaders?.() || {};
      const resolvedHeaders = isAppRouterHeaders(headers)
        ? Object.fromEntries(headers.entries())
        : headers;
      const allowedHeaders = Object.fromEntries(
        Object.entries(resolvedHeaders).filter(
          ([key]) => !BLACKLISTED_HEADERS.includes(key)
        )
      );

      return allowedHeaders;
    },
  };
}
