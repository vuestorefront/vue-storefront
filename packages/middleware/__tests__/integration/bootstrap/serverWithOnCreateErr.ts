import { apiClientFactory } from "../../../src/apiClientFactory";
import * as api from "./api";

const onCreate = async () => {
  throw new Error("smth");
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
});

export { createApiClient };
