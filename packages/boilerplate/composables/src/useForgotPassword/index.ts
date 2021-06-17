import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const params: UseForgotPasswordFactoryParams<any, any> = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  resetPassword: async (context: Context, { email, customQuery }) => {
    console.log('Mocked: resetPassword');

    return {};
  },
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    console.log('Mocked: setNewPassword');
    return {};
  }
};

const useForgotPassword: () => UseForgotPassword<any, any> = useForgotPasswordFactory<any, any>(params);

export default useForgotPassword;
