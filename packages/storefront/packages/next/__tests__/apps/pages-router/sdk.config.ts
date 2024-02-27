import { Endpoints } from "@storefront/shared";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:4000",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, moduleFromEndpoints, middlewareUrl, getRequestHeaders }) => ({
    example: buildModule(
      moduleFromEndpoints<Endpoints>,
      {
        apiUrl: `${middlewareUrl}/test_integration`,
        defaultRequestConfig: {
          // TODO: Headers should accept Record<string, string | string[]>, it needs to be fixed as separate task.
          headers: getRequestHeaders() as Record<string, string>,
        },
      },
      (_, { context }) => ({
        extend: {
          getSuccess: async () => {
            const payload = await context.httpClient(`getSuccess`, {
              method: "POST",
            });
            return { ...payload, cookie: getRequestHeaders().cookie ?? null };
          },
        },
      })
    ),
  })
);
