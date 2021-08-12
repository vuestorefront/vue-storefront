import {
  Context,
  useShippingFactory,
  UseShippingParams
} from '@vue-storefront/core';
import type { ShippingAddress } from '@vue-storefront/boilerplate-api';
import type {
  UseShippingAddParams as AddParams
} from '../types';

const params: UseShippingParams<ShippingAddress, AddParams> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, { customQuery }) => {
    console.log('Mocked: useShipping.load');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  save: async (context: Context, { shippingDetails, customQuery }) => {
    console.log('Mocked: useShipping.save');
    return {};
  }
};

export const useShipping = useShippingFactory<ShippingAddress, AddParams>(params);
