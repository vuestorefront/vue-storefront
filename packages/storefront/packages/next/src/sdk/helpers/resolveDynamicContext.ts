import { DynamicContext, GetSdkContext } from "../types";

const BLACKLISTED_HEADERS = new Set(["host"]);

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
      return Object.fromEntries(
        Object.entries(resolvedHeaders).filter(
          ([key]) => !BLACKLISTED_HEADERS.has(key)
        )
      );
    },
  };
}
