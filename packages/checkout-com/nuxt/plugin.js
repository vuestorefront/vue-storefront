import { setup } from '@vue-storefront/checkout-com';

export default () => {
  const options = <%= serialize(options) %>;
  for (const channel of Object.keys(options.channels)) {
    delete options.channels[channel].secretKey;
  }
  
  setup(options);
};
