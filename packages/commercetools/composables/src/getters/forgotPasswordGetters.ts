import { CreatePasswordResetTokenResponse, ResetPasswordResponse } from '@vue-storefront/commercetools-api';
import { ForgotPasswordGetters } from '@vue-storefront/core';

export const getResetPasswordToken = (response: CreatePasswordResetTokenResponse) => response?.data?.customerCreatePasswordResetToken?.value;
export const isPasswordChanged = (response: ResetPasswordResponse) => Boolean(response?.data?.customerResetPassword?.email);

const forgotPasswordGetters: ForgotPasswordGetters<CreatePasswordResetTokenResponse, ResetPasswordResponse> = {
  getResetPasswordToken,
  isPasswordChanged
};

export default forgotPasswordGetters;
