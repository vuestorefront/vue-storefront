import { apiClientFactory } from "../../../src/apiClientFactory";
import * as api from "./api";
import { AlokaiContainer, getLogger } from "../../../src";

const init = () => {
  throw new Error("smth");
};

const onCreate = async (
  config: Record<string, unknown> = {},
  alokai: AlokaiContainer
) => {
  const logger = getLogger(alokai);
  logger.info("oncreate");

  return {
    config,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api,
});

export { createApiClient, init };
