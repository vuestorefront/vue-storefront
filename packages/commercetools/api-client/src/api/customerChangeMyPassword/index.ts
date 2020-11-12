import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';

const customerChangeMyPassword = async ({ $vsfSettings }, version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> => {
  const { client } = $vsfSettings;
  return await client.mutate({
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
