/* istanbul ignore file */
import { signIn, getMe } from '@vue-storefront/virtocommerce-api';

import { useUserFactory, UseUserFactoryParams } from '@vue-storefront/core';
import { User } from '../../types';

// @todo useUser

const params: UseUserFactoryParams<any, any, any> = {
  loadUser: async () => {
    return await getMe();
  },
  logOut: async () => {
    // @todo
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async ({currentUser, updatedUserData}): Promise<any> => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async ({email, password, firstName, lastName}) => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async ({ username, password }) => {
    return await signIn(username, password);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    // @todo
    return {};
  }
};

const {setUser, useUser} = useUserFactory<any, any, any>(params);

export {setUser, useUser};
