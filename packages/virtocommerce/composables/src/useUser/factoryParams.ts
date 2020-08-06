import { UseUserFactoryParams } from '@vue-storefront/core';
import { Customer } from '../types/GraphQL';
// import {
//   getMe as apiGetMe
// } from '@vue-storefront/virtocommerce-api';

export const params: UseUserFactoryParams<Customer, any, any> = {
  loadUser: async (): Promise<Customer> => {
    try {
      // const profile: ProfileResponse = await apiGetMe();
      console.info('loadUser: mock - return test user');
      // return profile.data.me.user;
      return {
        firstName: 'Vitaly',
        lastName: 'Tartynov',
        email: 'vta@virtoway.com'
      } as Customer;
    } catch (err) {
      const error = err.graphQLErrors ? err.graphQLErrors[0].message : err.message;
      throw new Error(error);
    }
  },
  logOut: async () => {
    console.log('logout: mock');
  },
  updateUser: async (): Promise<any> => {
    console.log('updateUser: mock');
    return Promise.resolve();
  },
  register: async (): Promise<any> => {
    console.log('register: mock');
    return Promise.resolve();
  },
  logIn: async (): Promise<any> => {
    console.log('logIn: mock');
    return Promise.resolve();
  },
  changePassword: async function changePassword(): Promise<any> {
    console.log('changePassword: mock');
    return Promise.resolve();
  }
};
