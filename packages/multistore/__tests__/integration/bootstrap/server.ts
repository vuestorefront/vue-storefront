import { apiClientFactory } from "@vue-storefront/middleware";
import { getConfig } from "./api";

const onCreate = (settings) => {
  return {
    config: settings,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: { getConfig },
});

export { createApiClient };
