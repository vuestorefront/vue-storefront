import { ForgotPasswordGetters } from '@vue-storefront/core';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getResetPasswordToken(result) {
  return '';
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function isPasswordChanged(result) {
  return true;
}

const forgotPasswordGetters: ForgotPasswordGetters<any> = {
  getResetPasswordToken,
  isPasswordChanged
};

export default forgotPasswordGetters;
