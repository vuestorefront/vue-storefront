import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';

const addresses: any[] = [
  {
    firstName: 'Sviatlana',
    lastName: 'Havaka',
    streetName: 'Zielinskiego',
    apartment: '24/193A',
    city: 'Radom',
    state: 'Masovian',
    zipCode: '26-600',
    country: 'Poland',
    phoneNumber: '(00)560 123 456'
  },
  {
    firstName: 'Sviatlana',
    lastName: 'Havaka',
    streetName: 'Zielinskiego',
    apartment: '20/193A',
    city: 'Wroclaw',
    state: 'Lower Silesia',
    zipCode: '53-603',
    country: 'Poland',
    phoneNumber: '(00)560 123 456'
  }
];

const params: UseUserShippingFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (params?) => {
    console.log('Mocked: addAddress', params.address);
    addresses.push(params.address);
    return Promise.resolve(addresses);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (params?) => {
    console.log('Mocked: deleteAddress');
    return Promise.resolve(addresses);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateAddress: async (params?) => {
    console.log('Mocked: updateAddress');
    return Promise.resolve(addresses);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (params?) => {
    console.log('Mocked: load');
    return Promise.resolve(addresses);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setDefault: async (params?) => {
    console.log('Mocked: setDefault');
    return Promise.resolve({});
  }
};

const { useUserShipping } = useUserShippingFactory<any>(params);

export default useUserShipping;
