import { useCheckoutShippingFactory, UseCheckoutShippingParams, Context } from '@vue-storefront/core';

const params: UseCheckoutShippingParams<any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context) => {
    return Promise.resolve({});
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, params) => {
    return Promise.resolve({});
  }
};

export default useCheckoutShippingFactory<any, any>(params);
