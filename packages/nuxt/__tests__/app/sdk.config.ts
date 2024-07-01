import type { Endpoints } from "@storefront/shared";

export default defineSdkConfig(
  ({ buildModule, middlewareModule, getRequestHeaders, config }) => {
    return {
      example: buildModule(middlewareModule<Endpoints>, {
        apiUrl: `${config.middlewareUrl}/test_integration`,
        defaultRequestConfig: { headers: { ...getRequestHeaders() } },
      }),
    };
  }
);
