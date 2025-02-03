import { apiClientFactory } from "../../../src/apiClientFactory";

const onCreate = async (config: Record<string, unknown> = {}) => {
  return {
    config,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {},
});

export { createApiClient };
