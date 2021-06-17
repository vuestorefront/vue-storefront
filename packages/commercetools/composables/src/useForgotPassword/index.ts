import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<any, any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    const response = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
    return response?.data?.customerCreatePasswordResetToken?.value;
  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    const response = await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
    return Boolean(response?.data?.customerResetPassword?.id);
  }
};

const useForgotPassword: () => UseForgotPassword<any, any> = useForgotPasswordFactory<any, any>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
