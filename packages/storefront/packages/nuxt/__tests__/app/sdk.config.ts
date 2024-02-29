import { Endpoints, exampleSdkModule } from "@storefront/shared";

export default defineSdkConfig(
  ({ buildModule, moduleFromEndpoints, middlewareUrl, getCookieHeader }) => {
    return {
      example: buildModule(moduleFromEndpoints<Endpoints>, {
        apiUrl: `${middlewareUrl}/test_integration`,
        defaultRequestConfig: { headers: { ...getCookieHeader() } },
      }),
    };
  }
);
