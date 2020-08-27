import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import { apiClientFactory } from '@vue-storefront/core';
import { ApiClientMethods, ApiClientSettings } from './types';

const { setup, getSettings } = apiClientFactory<ApiClientMethods, ApiClientSettings>({
  defaultSettings: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetup: (config: any) => {}
});

const settings = getSettings();

export {
  getProduct,
  getCategory,
  setup,
  settings
};
