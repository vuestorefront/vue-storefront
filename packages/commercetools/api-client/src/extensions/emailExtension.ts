import { ApiClientExtension } from '@vue-storefront/core';
import { customerCreatePasswordResetToken } from '../api';

export const emailExtension: ApiClientExtension = {
  name: 'logMailExtension',

  extendApiMethods: {
    async customerCreatePasswordResetToken(context, email) {
      const response = await customerCreatePasswordResetToken(context, email);
      const token = response?.data?.customerCreatePasswordResetToken?.value;

      const emailObject = {
        to: email,
        from: 'password-recovery@vue-storefront.io',
        subject: `Password recovery for ${email}`,
        html: `<a href='/reset-password?token=${token}'>Reset your password by clicking this link</a>`
      };

      console.log(JSON.stringify(emailObject));
      return response;
    }
  }
};
