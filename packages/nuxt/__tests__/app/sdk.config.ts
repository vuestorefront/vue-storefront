import { Endpoints } from "@storefront/shared";

export default defineSdkConfig(
  ({ buildModule, middlewareModule, middlewareUrl, getRequestHeaders }) => {
    return {
      example: buildModule(middlewareModule<Endpoints>, {
        apiUrl: `${middlewareUrl}/test_integration`,
        defaultRequestConfig: { headers: { ...getRequestHeaders() } },
      }),
    };
  }
);
