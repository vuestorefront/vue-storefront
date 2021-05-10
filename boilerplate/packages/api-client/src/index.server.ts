import { apiClientFactory } from '@vue-storefront/core';
import getProduct from './api/getProduct';
import getCategory from './api/getCategory';

const defaultSettings = {};

const onCreate = (settings) => ({
  config: {
    ...defaultSettings,
    ...settings
  },
  client: {}
});

const { createApiClient } = apiClientFactory<any, any>({
  onCreate,
  api: {
    getProduct,
    getCategory
  }
});

export {
  createApiClient
};
