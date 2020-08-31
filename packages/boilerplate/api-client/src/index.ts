import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import { apiClientFactory } from '@vue-storefront/core';

const { setup, update, getSettings } = apiClientFactory<any, any>({
  defaultSettings: {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onSetup: (config: any) => {}
});

const settings = getSettings();

export {
  getProduct,
  getCategory,
  setup,
  update,
  settings
};
