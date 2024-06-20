import { Endpoints } from "@storefront/shared";
import { defineSdkConfig } from "@vue-storefront/next";

export function getSdkConfig() {
  return defineSdkConfig(({ buildModule, middlewareModule, config, getRequestHeaders }) => ({
    example: buildModule(middlewareModule<Endpoints>, {
      apiUrl: `${config.middlewareUrl}/test_integration`,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  }));
}
