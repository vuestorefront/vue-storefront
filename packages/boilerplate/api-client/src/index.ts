import getProduct from './api/getProduct';
import getCategory from './api/getCategory';
import getReview from './api/getReview';
import addReview from './api/addReview';
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
  getReview,
  addReview,
  setup,
  update,
  settings
};
