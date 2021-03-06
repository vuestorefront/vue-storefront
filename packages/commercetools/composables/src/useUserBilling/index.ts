import { useUserBillingFactory, UseUserBillingFactoryParams, Context } from '@vue-storefront/core';
import { makeId } from '../helpers/internals';

const addresses: any[] = [
  {
    id: '_1231231253623423',
    firstName: 'John',
    lastName: 'Doe',
    streetName: 'Warsawska',
    streetNumber: '24',
    apartment: '193A',
    city: 'Palo Alto',
    state: 'California',
    postalCode: '26-620',
    country: 'US',
    phone: '560123456',
    email: '',
    company: null,
    isDefault: true
  },
  {
    id: '_245463456456356',
    firstName: 'Jonatan',
    lastName: 'Doe',
    streetName: 'Starachowicka',
    streetNumber: '20',
    apartment: '193A',
    city: 'Las Vegas',
    state: 'Nevada',
    postalCode: '53-603',
    country: 'US',
    phone: '560123456',
    email: '',
    company: null,
    isDefault: true
  }
];

const billing = {
  addresses
};

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

const params: UseUserBillingFactoryParams<any, any> = {
  addAddress: async (context: Context, params?) => {
    console.log('Mocked: addAddress', params.address);

    const newAddress = {
      ...params.address,
      id: makeId(17)
    };

    if (params.address.isDefault) {
      disableOldDefault();
      addresses.unshift(newAddress);
    } else {
      addresses.push(newAddress);
    }

    return Promise.resolve(billing);
  },

  deleteAddress: async (context: Context, params?) => {
    console.log('Mocked: deleteAddress', params);

    const indexToRemove = addresses.findIndex(address => address.id === params.address.id);
    if (indexToRemove < 0) {
      return Promise.reject('This address does not exist');
    }

    addresses.splice(indexToRemove, 1);
    return Promise.resolve(billing);
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
    return Promise.resolve(billing);
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  load: async (context: Context, params?) => {
    console.log('Mocked: load');
    return Promise.resolve(billing);
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

    return Promise.resolve(billing);
  }
};

export default useUserBillingFactory<any, any>(params);
