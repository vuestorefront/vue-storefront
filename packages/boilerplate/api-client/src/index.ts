import getProduct from './api/getProduct';
import { apiClientFactory } from '@vue-storefront/core';

const { setup, override } = apiClientFactory<any, any>();

export {
  getProduct,
  override,
  setup
};
