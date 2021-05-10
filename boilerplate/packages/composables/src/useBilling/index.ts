import { useBillingFactory, UseBillingParams, Context } from '@vue-storefront/core';
import { Address } from '../types';

let details = {};

const params: UseBillingParams<Address, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: loadBilling');
    return details;
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { billingDetails, customQuery }) => {
    console.log('Mocked: saveBilling');
    details = billingDetails;
    return details;
  }
};

export default useBillingFactory<Address, any>(params);
