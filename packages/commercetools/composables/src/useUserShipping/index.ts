import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';
import { Address } from '../types/GraphQL';

const params: UseUserShippingFactoryParams<Address> = {
  addAddress: async ({
    address,
    addresses
  }) => {
    console.log('Adding shipping address...', address);
    console.log('Shipping addresses', addresses);
    return Promise.resolve([]);
  },
  deleteAddress: async ({
    address,
    addresses
  }) => {
    console.log('Deleting shipping address...', address);
    console.log('Shipping addresses', addresses);
    return Promise.resolve([]);
  },
  updateAddress: async ({
    address,
    addresses
  }) => {
    console.log('Updating shipping address...', address);
    console.log('Shipping addresses', addresses);
    return Promise.resolve([]);
  },
  load: async ({
    addresses
  }) => {
    console.log('Loading shipping addresses...');
    console.log('Shipping addresses', addresses);
    return Promise.resolve([]);
  },
  setDefault: async ({
    address,
    addresses
  }) => {
    console.log('Seting default shipping address', address);
    console.log('Shipping addresses', addresses);
    return Promise.resolve({
      country: 'PL',
      contactInfo: {}
    });
  }
};

const { useUserShipping } = useUserShippingFactory<Address>(params);

export default useUserShipping;
