import { ForgotPasswordGetters } from '@vue-storefront/core';
import { ForgotPasswordResult } from '../types';

export const getResetPasswordToken = (result: ForgotPasswordResult) => result?.resetPasswordResult?.data?.customerCreatePasswordResetToken?.value;
export const isPasswordChanged = (result: ForgotPasswordResult) => Boolean(result?.setNewPasswordResult?.data?.customerResetPassword?.email);

const forgotPasswordGetters: ForgotPasswordGetters<ForgotPasswordResult> = {
  getResetPasswordToken,
  isPasswordChanged
};

export default forgotPasswordGetters;
