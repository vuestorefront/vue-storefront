import { setup } from '@vue-storefront/checkout-com';

export default () => {
  setup(JSON.parse('<%= JSON.stringify(options) %>'));
};
