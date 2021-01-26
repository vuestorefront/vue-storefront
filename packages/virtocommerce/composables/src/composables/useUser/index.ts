/* istanbul ignore file */
import { useUserFactory, UseUserFactoryParams, Context } from '@vue-storefront/core';
import { User } from '../../types';

// @todo useUser

const params: UseUserFactoryParams<any, any, any> = {
  load: async (context: Context) => {
    return await context.$vc.api.getMe(context);
  },
  logOut: async () => {
    // @todo
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  updateUser: async (context: Context, {currentUser, updatedUserData}): Promise<any> => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  register: async (context: Context, {email, password, firstName, lastName}) => {
    // @todo
    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  logIn: async (context: Context, { username, password }) => {
    return await context.$vc.api.signIn(context, username, password);
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changePassword: async function changePassword(context: Context, {currentUser, currentPassword, newPassword}) {
    // @todo
    return {};
  }
};

export default useUserFactory<any, any, any>(params);