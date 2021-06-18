import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<any, any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    try {
      const response = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
      return response?.data?.customerCreatePasswordResetToken?.value;
    } catch (err) {
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }

  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    try {
      const response = await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
      return Boolean(response?.data?.customerResetPassword?.id);
    } catch (err) {
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }
  }
};

const useForgotPassword: () => UseForgotPassword<any, any> = useForgotPasswordFactory<any, any>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
