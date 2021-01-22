import { useUserShippingFactory, UseUserShippingFactoryParams, Context } from '@vue-storefront/core';

const addresses: any[] = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Warsawska',
    streetNumber: '24',
    apartment: '193A',
    city: 'Phoenix',
    state: null,
    postalCode: '26-620',
    country: 'US',
    phone: '560123456',
    email: '',
    company: null,
    isDefault: true
  },
  {
    id: 2,
    firstName: 'Jonatan',
    lastName: 'Doe',
    streetName: 'Starachowicka',
    streetNumber: '20',
    apartment: '193A',
    city: 'Atlanta',
    state: null,
    postalCode: '53-603',
    country: 'US',
    phone: '560123456',
    email: '',
    company: null,
    isDefault: true
  }
];

const shipping = {
  addresses
};

const findBiggestId = () => addresses.reduce((highest, { id }) => Math.max(highest, id), 0);

const disableOldDefault = () => {
  const oldDefault = addresses.find(address => address.isDefault);
  if (oldDefault) {
    oldDefault.isDefault = false;
  }
};

const sortDefaultAtTop = (a, b) => {
  if (a.isDefault) {
    return -1;
  } else if (b.isDefault) {
    return 1;
  }
  return 0;
};

const params: UseUserShippingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    console.log('Mocked: addAddress', params.address);

    const newAddress = {
      ...params.address,
      id: findBiggestId() + 1
    };

    if (params.address.isDefault) {
      disableOldDefault();
      addresses.unshift(newAddress);
    } else {
      addresses.push(newAddress);
    }

    return Promise.resolve(shipping);
  },

  deleteAddress: async (context: Context, params?) => {
    console.log('Mocked: deleteAddress', params);

    const indexToRemove = addresses.findIndex(address => address.id === params.address.id);
    if (indexToRemove < 0) {
      return Promise.reject('This address does not exist');
    }

    addresses.splice(indexToRemove, 1);
    return Promise.resolve(shipping);
  },

  updateAddress: async (context: Context, params?) => {
    console.log('Mocked: updateAddress', params);

    const indexToUpdate = addresses.findIndex(address => address.id === params.address.id);
    if (indexToUpdate < 0) {
      return Promise.reject('This address does not exist');
    }

    const isNewDefault = params.address.isDefault && addresses[0].id !== params.address.id;

    if (isNewDefault) {
      disableOldDefault();
    }

    addresses[indexToUpdate] = params.address;

    if (isNewDefault) {
      addresses.sort(sortDefaultAtTop);
    }
    return Promise.resolve(shipping);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    console.log('Mocked: load');
    return Promise.resolve(shipping);
  },

  setDefaultAddress: async (context: Context, params?) => {
    console.log('Mocked: setDefaultAddress');
    const isDefault = id => addresses[0].id === id;

    if (!isDefault(params.address.id)) {
      const indexToUpdate = addresses.findIndex(address => address.id === params.address.id);
      if (indexToUpdate < 0) {
        return Promise.reject('This address does not exist');
      }
      disableOldDefault();
      addresses[indexToUpdate].isDefault = true;
      addresses.sort(sortDefaultAtTop);
    }

    return Promise.resolve(shipping);
  }
};

export default useUserShippingFactory<any, any>(params);
