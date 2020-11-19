import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';
import { Config } from './../../types/setup';

const customerChangeMyPassword = async (settings: Config, version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> => {
  const { client } = settings;
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
