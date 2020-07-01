import { setup } from '@vue-storefront/checkout-com';

export default () => {
  setup({
    publicKey: '<%= options.publicKey %>'
  });
};
