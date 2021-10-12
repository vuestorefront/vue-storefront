import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';
import { ForgotPasswordResult } from '../types';

const handleGraphQLError = (error: any) => {
  error.message = error?.graphQLErrors?.[0]?.message || error.message;
  throw error?.response?.data?.graphQLErrors?.[0] || error;
};

const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<ForgotPasswordResult> = {
  resetPassword: async (context: Context, { email, currentResult, customQuery }) => {
    try {
      const resetPasswordResult = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
      return {
        ...currentResult,
        resetPasswordResult
      };
    } catch (err) {
      handleGraphQLError(err);
    }

  },
  setNewPassword: async (context: Context, { tokenValue, newPassword, currentResult, customQuery }) => {
    try {
      const setNewPasswordResult = await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
      return {
        ...currentResult,
        setNewPasswordResult
      };
    } catch (err) {
      handleGraphQLError(err);
    }
  }
};

const useForgotPassword: () => UseForgotPassword<ForgotPasswordResult> = useForgotPasswordFactory<ForgotPasswordResult>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
