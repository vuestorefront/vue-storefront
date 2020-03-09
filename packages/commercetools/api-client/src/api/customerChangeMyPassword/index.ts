import { apolloClient } from '../../index';
import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';

const customerChangeMyPassword = async (version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> => {
  return await apolloClient.mutate({
    mutation: CustomerChangeMyPassword,
    variables: {
      version,
      currentPassword,
      newPassword
    },
    fetchPolicy: 'no-cache'
  }) as ChangeMyPasswordResponse;
};

export default customerChangeMyPassword;
