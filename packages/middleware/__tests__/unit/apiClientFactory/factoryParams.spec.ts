import { apiClientFactory } from "../../../src";
import * as api from "../../integration/bootstrap/api";

describe("apiClientFactory", () => {
  it("Should validate params with sync onCreate", () => {
    apiClientFactory({
      onCreate: (config: Record<string, unknown> = {}) => {
        return {
          config,
          client: null,
        };
      },
      api,
    });
  });

  it("Should validate params with async onCreate", () => {
    apiClientFactory({
      onCreate: async (config: Record<string, unknown> = {}) => {
        return {
          config,
          client: null,
        };
      },
      api,
    });
  });
});
