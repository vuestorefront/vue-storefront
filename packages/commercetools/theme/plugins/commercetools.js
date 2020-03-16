import { setup } from '@vue-storefront/commercetools-api';
import { config } from './commercetools-config';

export default () => {

  /**
   * Setup commercetools API client
   */
  setup(config);
};
