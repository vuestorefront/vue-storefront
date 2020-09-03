import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';
import { Address } from '../types/GraphQL';

const params: UseUserShippingFactoryParams<Address> = {
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

const { useUserShipping } = useUserShippingFactory<Address>(params);

export default useUserShipping;
