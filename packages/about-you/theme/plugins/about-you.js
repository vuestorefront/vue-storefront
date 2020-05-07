import { setup } from '@vue-storefront/about-you-api';
import { config } from './about-you-config.js';
import { getCartToken } from '~/helpers/cart/getCartToken';

export default ({ app }) => {
  setup({
    ...config,
    cartToken: getCartToken(app)
  });
};
