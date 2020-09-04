import { useUserBillingFactory, UseUserBillingFactoryParams } from '@vue-storefront/core';
import { Address } from '../types/GraphQL';

const params: UseUserBillingFactoryParams<Address> = {
  addAddress: async ({
    address,
    addresses
  }) => {
    console.log('Adding billing address...', address);
    console.log('Billing addresses', addresses);
    return Promise.resolve([]);
  },
  deleteAddress: async ({
    address,
    addresses
  }) => {
    console.log('Deleting billing address...', address);
    console.log('Billing addresses', addresses);
    return Promise.resolve([]);
  },
  updateAddress: async ({
    address,
    addresses
  }) => {
    console.log('Updating billing address...', address);
    console.log('Billing addresses', addresses);
    return Promise.resolve([]);
  },
  load: async ({
    addresses
  }) => {
    console.log('Loading billing addresses...');
    console.log('Billing addresses', addresses);
    return Promise.resolve([]);
  },
  setDefault: async ({
    address,
    addresses
  }) => {
    console.log('Seting default billing address', address);
    console.log('Billing addresses', addresses);
    return Promise.resolve({
      country: 'PL',
      contactInfo: {}
    });
  }
};

const { useUserBilling } = useUserBillingFactory<Address>(params);

export default useUserBilling;
