import { apiClientFactory } from "../apiClientFactory";

export const createEmptyApiClient = () =>
  apiClientFactory({
    onCreate: () => ({}),
    api: {},
  });
