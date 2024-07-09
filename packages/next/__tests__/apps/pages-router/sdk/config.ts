import { defineSdkConfig } from "@vue-storefront/next";
import type { Endpoints } from "@storefront/shared";

export function getSdkConfig() {
  return defineSdkConfig(({ buildModule, middlewareModule, config, getRequestHeaders }) => ({
    example: buildModule(middlewareModule<Endpoints>, {
      apiUrl: `${config.middlewareUrl}/test_integration`,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    })
  }));
}
