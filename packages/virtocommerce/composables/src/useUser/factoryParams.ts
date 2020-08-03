import { UseUserFactoryParams } from '@vue-storefront/core';
import { Customer } from '../types/GraphQL';
import {
  getMe as apiGetMe
} from '@vue-storefront/virtocommerce-api';

export const params: UseUserFactoryParams<Customer, any, any> = {
  loadUser: async (): Promise<Customer> => {
    console.warn('loadUser started');
    try {
      const profile = await apiGetMe();
      return profile.data.me.customer;
    } catch (err) {
      const error = err.graphQLErrors ? err.graphQLErrors[0].message : err.message;
      throw new Error(error);
    } finally {
      console.warn('loadUser finished');
    }
  },
  logOut: async () => {
    console.log('logout');
  },
  updateUser: async (): Promise<any> => {
    console.log('updateUser');
    return Promise.resolve();
  },
  register: async (): Promise<any> => {
    console.log('register');
    return Promise.resolve();
  },
  logIn: async (): Promise<any> => {
    console.log('logIn');
    return Promise.resolve();
  },
  changePassword: async function changePassword(): Promise<any> {
    console.log('changePassword');
    return Promise.resolve();
  }
};
