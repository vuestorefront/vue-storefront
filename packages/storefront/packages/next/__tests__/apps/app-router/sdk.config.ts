import { Endpoints } from "@storefront/shared";
import { CreateSdkOptions, createSdk } from "@vue-storefront/next";

const options: CreateSdkOptions = {
  middleware: {
    apiUrl: "http://localhost:4000/",
  },
};

export const { getSdk } = createSdk(
  options,
  ({ buildModule, moduleFromEndpoints, middlewareUrl, getRequestHeaders }) => ({
    example: buildModule(moduleFromEndpoints<Endpoints>, {
      apiUrl: `${middlewareUrl}/test_integration`,
      defaultRequestConfig: {
        headers: getRequestHeaders(),
      },
    }),
  })
);
