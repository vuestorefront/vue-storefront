import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';
import { ForgotPasswordResult } from '../types';

/**
 * @remarks References:
 * {@link ForgotPasswordResult}
 */
const useForgotPasswordFactoryParams: UseForgotPasswordFactoryParams<ForgotPasswordResult> = {
  resetPassword: async (context: Context, { email, currentResult, customQuery }) => {
    try {
      const resetPasswordResult = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
      return {
        ...currentResult,
        resetPasswordResult
      };
    } catch (err) {
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
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
      err.message = err?.graphQLErrors?.[0]?.message || err.message;
      throw err?.response?.data?.graphQLErrors?.[0] || err;
    }
  }
};

/**
 * @remarks References:
 * {@link ForgotPasswordResult}
 */
const useForgotPassword: () => UseForgotPassword<ForgotPasswordResult> = useForgotPasswordFactory<ForgotPasswordResult>(useForgotPasswordFactoryParams);

export {
  useForgotPassword,
  useForgotPasswordFactoryParams
};
