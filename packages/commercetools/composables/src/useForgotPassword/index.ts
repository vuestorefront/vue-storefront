import { Context, UseForgotPassword, useForgotPasswordFactory, UseForgotPasswordFactoryParams } from '@vue-storefront/core';

const params: UseForgotPasswordFactoryParams<any, any> = {
  resetPassword: async (context: Context, { email, customQuery }) => {
    const response = await context.$ct.api.customerCreatePasswordResetToken(email, customQuery);
    const token = response?.data?.customerCreatePasswordResetToken?.value;
    const emailObject = {
      to: email,
      from: 'password-recovery@vue-storefront.io',
      subject: `Password recovery for ${email}`,
      html: `<a href='https://vsf-next-demo.storefrontcloud.io/reset-password?token=${token}'>Reset your password by clicking this link</a>`
    };

    if (process.env.IS_DEMO) {
      console.log(JSON.stringify(emailObject));
    }
    return token;
  },
  changePassword: async (context: Context, { tokenValue, newPassword, customQuery }) => {
    const response = await context.$ct.api.customerResetPassword(tokenValue, newPassword, customQuery);
    const result = Boolean(response?.data?.customerResetPassword?.id);
    return result;
  }
};

const useForgotPassword: () => UseForgotPassword<any, any> = useForgotPasswordFactory<any, any>(params);

export default useForgotPassword;
