import { Endpoints } from "@storefront/shared";

export default defineSdkConfig(
  ({ buildModule, moduleFromEndpoints, middlewareUrl, getRequestHeaders }) => {
    return {
      example: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: `${middlewareUrl}/test_integration`,
        defaultRequestConfig: { headers: { ...getRequestHeaders() } },
      }),
    };
  }
);
