/* istanbul ignore file */

import { useUserFactory, UseUserFactoryParams } from '@vue-storefront/core';
import { User } from '../../types';
import { getCustomer } from '@vue-storefront/shopify-api';
import Cookies from 'js-cookie';

// @todo useUser
const params: UseUserFactoryParams<User, any, any> = {
  loadUser: async () => {
    const token = Cookies.get('token');
    const result: any = await getCustomer.fetch(token);
    let customer = {};
    if (result) {
      customer = result.customer;
      return customer;
    }

    return customer;
  },
  logOut: async () => {
    const token = Cookies.get('token');
    Cookies.remove('token');
    await getCustomer.signOut(token);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async ({ currentUser, updatedUserData }): Promise<User> => {
    const token = Cookies.get('token');
    await getCustomer.editProfile(token, {
      email: updatedUserData.email,
      firstName: updatedUserData.firstName,
      lastName: updatedUserData.lastName
    });
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async ({ email, password, firstName, lastName }) => {
    const result: any = await getCustomer.signUp({
      email: email,
      firstName: firstName,
      lastName: lastName,
      password: password
    });
    const response: User = {
      error: result.customerCreate.customerUserErrors.length
        ? result.customerCreate.customerUserErrors[0].message
        : ''
    };
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async ({ username, password }) => {
    const result: any = await getCustomer.signIn(username, password);
    const response: User = {
      token: result.customerAccessTokenCreate.customerAccessToken
        ? result.customerAccessTokenCreate.customerAccessToken.accessToken
        : null,
      error: result.customerAccessTokenCreate.customerUserErrors.length
        ? result.customerAccessTokenCreate.customerUserErrors[0].message
        : ''
    };
    Cookies.set('token', response.token);
    return response;
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword({
    newPassword
  }) {
    let token = Cookies.get('token');
    const result: any = await getCustomer.changePassword(token, newPassword);
    token = result.customerUpdate.customerAccessToken.accessToken;
    Cookies.set('token', token);
    return {};
  }
};

const { setUser, useUser } = useUserFactory<User, any, any>(params);

export { setUser, useUser };
