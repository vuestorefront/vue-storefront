import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';
import { apiClientMethodFactory } from './../../configuration';

async function customerChangeMyPassword(version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> {
  const { client } = this.$vsf.ct;
  return await client.mutate({
    mutation: CustomerChangeMyPassword,
    variables: {
      version,
      currentPassword,
      newPassword
    },
    fetchPolicy: 'no-cache'
  }) as ChangeMyPasswordResponse;
}

export default apiClientMethodFactory(customerChangeMyPassword);
