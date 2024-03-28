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
    getProduct: async (_context, params) => {
      return { id: params.id, name: "Test Product" };
    },
    getProducts: async (_context, _params) => {
      return [{ id: 1, name: "Test Product" }];
    },
    getCategory: async (_context, id) => {
      return { id, name: "Test Category" };
    },
    unauthorized: async (_context, _params) => {
      throw { statusCode: 401, message: "Unauthorized" };
    },
    logout: async (_context) => {},
  },
});

exports.createApiClient = createApiClient;
