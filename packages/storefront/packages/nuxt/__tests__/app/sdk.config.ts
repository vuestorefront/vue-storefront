import { Endpoints, exampleSdkModule } from "@storefront/shared";

export default defineSdkConfig(
  ({ buildModule, moduleFromEndpoints, middlewareUrl, getCookieHeader }) => {
    // TODO: This is really strange, need to consult it with someone who knows the codebase.
    // headers called in the method are not available (even if they are, ss from middleware) but defined in here works correctly.
    // This is a mess.
    const headers = { cookie: getCookieHeader() as any };

    return {
      example: buildModule(
        moduleFromEndpoints<Endpoints>,
        {
          apiUrl: `${middlewareUrl}/test_integration`,
          defaultRequestConfig: { headers },
        },
        (_, { context }) => ({
          override: {
            getSuccess: async () => {
              const payload = await context.httpClient(`getSuccess`, {
                method: "POST",
              });
              return { ...payload, cookie: headers.cookie ?? null };
            },
          },
        })
      ),
    };
  }
);
