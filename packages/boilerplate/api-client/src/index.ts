import getProduct from './api/getProduct';
import { apiClientFactory } from '@vue-storefront/factories';

const { setup, override } = apiClientFactory<any, any>();

export {
  getProduct,
  override,
  setup
};
