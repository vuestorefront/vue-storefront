import CustomerResetPassword from './defaultMutation';
import { ResetPasswordResponse } from 'src/types/Api';

const customerResetPassword = async ({ client }, tokenValue: string, newPassword: string): Promise<ResetPasswordResponse> => {
  return await client.mutate({
    mutation: CustomerResetPassword,
    variables: {
      tokenValue,
      newPassword
    },
    fetchPolicy: 'no-cache'
  }) as ResetPasswordResponse;
};

export default customerResetPassword;
