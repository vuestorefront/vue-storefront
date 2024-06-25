import { apiClientFactory } from "../../../src/apiClientFactory";
import * as api from "./api";

const onCreate = async (config: Record<string, unknown> = {}) => {
  return {
    config,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
  extensions: [
    {
      name: "bootstrap-extension",
      extendApiMethods: {
        extendedFunc() {
          return { isExtended: true };
        },
      },
    },
  ],
});

export { createApiClient };
