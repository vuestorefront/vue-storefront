import { useShippingFactory, UseShippingParams, Context } from '@vue-storefront/core';
import { Address } from '../types';

let details = {};

const params: UseShippingParams<Address, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadShipping');
    return details;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('Mocked: saveShipping');
    details = shippingDetails;
    return details;
  }
};

export default useShippingFactory<Address, any>(params);
