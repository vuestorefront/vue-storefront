import {
  Context,
  useUserBillingFactory,
  UseUserBillingFactoryParams
} from '@vue-storefront/core';
import type {
  UserBillingAddress as Address,
  UserBillingAddressItem as AddressItem
} from '@vue-storefront/boilerplate-api';

const params: UseUserBillingFactoryParams<Address, AddressItem> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (context: Context, params) => {
    console.log('Mocked: useUserBilling.addAddress');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (context: Context, params) => {
    console.log('Mocked: useUserBilling.deleteAddress');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (context: Context, params) => {
    console.log('Mocked: useUserBilling.updateAddress');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params) => {
    console.log('Mocked: useUserBilling.load');
    return {};
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefaultAddress: async (context: Context, params) => {
    console.log('Mocked: useUserBilling.setDefaultAddress');
    return {};
  }
};

export const useUserBilling = useUserBillingFactory<Address, AddressItem>(params);
