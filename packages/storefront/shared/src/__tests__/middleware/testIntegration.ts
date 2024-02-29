import { apiClientFactory } from "@vue-storefront/middleware";
import { Request } from "express";

const api = {
  getSuccess: async (context: { req: Request }) => {
    return {
      status: 200,
      message: "ok",
      error: false,
      cookies: context.req.cookies ?? null,
    };
  },
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
