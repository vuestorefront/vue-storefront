import { apiClientFactory } from "../apiClientFactory";

export const createEmptyApiClient = () =>
  apiClientFactory({
    onCreate: () => ({
      client: {},
      config: {},
    }),
    api: {},
  });
