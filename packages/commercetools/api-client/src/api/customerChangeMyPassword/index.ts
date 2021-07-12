import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';

const customerChangeMyPassword = async ({ client, config }, version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> => {
  return await client.mutate({
    mutation: CustomerChangeMyPassword,
    variables: {
      version,
      currentPassword,
      newPassword,
      storeKey: config.store
    },
    fetchPolicy: 'no-cache'
  }) as ChangeMyPasswordResponse;
};

export default customerChangeMyPassword;
