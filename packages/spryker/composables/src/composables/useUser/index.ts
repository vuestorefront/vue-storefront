/* istanbul ignore file */

import { useUserFactory, UseUserFactoryParams } from '@vue-storefront/core';
import { User } from '../../types';

// @todo useUser

const params: UseUserFactoryParams<User, any, any> = {
  loadUser: async () => {
    // @todo
    return {};
  },
  logOut: async () => {
    // @todo
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async ({currentUser, updatedUserData}): Promise<User> => {
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
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword({currentUser, currentPassword, newPassword}) {
    // @todo
    return {};
  }
};

const {setUser, useUser} = useUserFactory<User, any, any>(params);

export {setUser, useUser};
