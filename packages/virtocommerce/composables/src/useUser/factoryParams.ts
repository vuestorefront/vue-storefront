import { UseUserFactoryParams } from '@vue-storefront/core';
import { ProfileResponse } from '../../../api-client/src/types/api';
import { Customer } from '../types/GraphQL';
import {
  getMe as apiGetMe
} from '@vue-storefront/virtocommerce-api';

export const params: UseUserFactoryParams<Customer, any, any> = {
  loadUser: async (): Promise<Customer> => {
    try {
      const profile: ProfileResponse = await apiGetMe();
      console.info('loadUser: ', profile);
      return profile.data.me.user;
    } catch (err) {
      const error = err.graphQLErrors ? err.graphQLErrors[0].message : err.message;
      throw new Error(error);
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
