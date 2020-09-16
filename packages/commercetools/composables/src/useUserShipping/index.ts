import { useUserShippingFactory, UseUserShippingFactoryParams } from '@vue-storefront/core';

const addresses: any[] = [
  {
    id: 1,
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
    id: 2,
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

const findBiggestId = () => addresses.reduce((biggest, curr) => {
  if (curr.id > biggest) {
    biggest = curr.id;
  }
  return biggest;
}, 0);

const params: UseUserShippingFactoryParams<any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addAddress: async (params?) => {
    console.log('Mocked: addAddress', params.address);
    addresses.push({
      ...params.address,
      id: findBiggestId() + 1
    });
    return Promise.resolve(addresses);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  deleteAddress: async (params?) => {
    console.log('Mocked: deleteAddress');
    const indexToRemove = addresses.find(address => address.id === params.address.id);
    if (indexToRemove < 0) {
      return Promise.reject('This address does not exist');
    }
    addresses.splice(indexToRemove, 1);
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
