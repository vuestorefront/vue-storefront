import { useUserBillingFactory, UseUserBillingFactoryParams } from '@vue-storefront/core';
import { Address } from '../types/GraphQL';

const params: UseUserBillingFactoryParams<Address> = {
  addAddress: async ({
    address,
    addresses
  }) => {
    console.log('Adding address...', address);
    console.log('Addresses', addresses);
    return Promise.resolve([]);
  },
  deleteAddress: async ({
    address,
    addresses
  }) => {
    console.log('Deleting address...', address);
    console.log('Addresses', addresses);
    return Promise.resolve([]);
  },
  updateAddress: async ({
    address,
    addresses
  }) => {
    console.log('Updating address...', address);
    console.log('Addresses', addresses);
    return Promise.resolve([]);
  },
  load: async ({
    addresses
  }) => {
    console.log('Loading addresses...');
    console.log('Addresses', addresses);
    return Promise.resolve([]);
  },
  setDefault: async ({
    address,
    addresses
  }) => {
    console.log('Seting default address', address);
    console.log('Addresses', addresses);
    return Promise.resolve({
      country: 'PL',
      contactInfo: {}
    });
  }
};

const { useUserBilling } = useUserBillingFactory<Address>(params);

export default useUserBilling;
