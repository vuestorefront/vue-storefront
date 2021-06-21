import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    try {
      return await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
    } catch (err) {
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }

  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    try {
      return await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
    } catch (err) {
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }
  }
};

const useForgotPassword: () => UseForgotPassword<any> = useForgotPasswordFactory<any>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
