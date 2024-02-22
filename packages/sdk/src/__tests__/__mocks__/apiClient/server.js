/* eslint-disable @typescript-eslint/no-unused-vars */
const { apiClientFactory } = require("@vue-storefront/middleware");

const onCreate = (settings) => {
  return {
    config: settings,
    client: null,
  };
};

const { createApiClient } = apiClientFactory({
  onCreate,
  api: {
    getProduct: async (_context, _params) => {
      return { id: 1, name: "Test Product" };
    },
    getProducts: async (_context, _params) => {
      return [{ id: 1, name: "Test Product" }];
    },
  },
});

exports.createApiClient = createApiClient;
