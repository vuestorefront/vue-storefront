import { apiClientFactory } from "../../../src/apiClientFactory";
import * as api from "./api";

const { createApiClient, init } = apiClientFactory({
  onCreate: (config) => {
    return {
      config,
      client: null,
    };
  },
  api,
  init: (config) => {
    return {
      ...config,
      isInit: true,
    };
  },
});

export { createApiClient, init };
