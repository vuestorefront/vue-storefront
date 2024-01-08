import { apiClientFactory } from "@vue-storefront/middleware";

const api = {
  success: () =>
    Promise.resolve({
      status: 200,
      message: "ok",
      error: false,
    }),
};

const onCreate = (config: Record<string, unknown> = {}) => {
  return {
    config,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
});

export { createApiClient };
