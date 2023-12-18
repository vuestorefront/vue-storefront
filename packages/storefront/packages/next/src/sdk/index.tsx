/* eslint-disable import/extensions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
import { buildModule, initSDK } from "@vue-storefront/sdk";
import { createSdkContext } from "./SdkContext";
import { composeMiddlewareUrl } from "./composeMiddlewareUrl";
import {
  Config,
  CreateSdkOptions,
  DynamicContext,
  GetSdkContext,
} from "./types";

export type { CreateSdkOptions } from "./types";

const BLACKLISTED_HEADERS = ["host"];

function isAppRouterHeaders(
  headers: ReturnType<GetSdkContext["getRequestHeaders"]>
): headers is Headers {
  return headers && "entries" in headers;
}

function resolveDynamicContext(context: GetSdkContext): DynamicContext {
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

export function createSdk<TConfig extends Record<string, any>>(
  options: CreateSdkOptions,
  config: Config<TConfig>
) {
  function getSdk(dynamicContext: GetSdkContext = {}) {
    const { getRequestHeaders } = resolveDynamicContext(dynamicContext);
    const middlewareUrl = composeMiddlewareUrl({
      options,
      headers: getRequestHeaders(),
    });

    const resolvedConfig = config({
      buildModule,
      getRequestHeaders,
      middlewareUrl,
    });

    return initSDK(resolvedConfig);
  }

  return {
    getSdk,
    createSdkContext: () => createSdkContext(getSdk()),
  };
}
