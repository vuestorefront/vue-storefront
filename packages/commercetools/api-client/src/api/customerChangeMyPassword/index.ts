import gql from 'graphql-tag';
import CustomerChangeMyPassword from './defaultMutation';
import { ChangeMyPasswordResponse } from '../../types/Api';

const customerChangeMyPassword = async ({ client }, version: any, currentPassword: string, newPassword: string): Promise<ChangeMyPasswordResponse> => {
  return await client.mutate({
    mutation: gql`${CustomerChangeMyPassword}`,
    variables: {
      version,
      currentPassword,
      newPassword
    },
    fetchPolicy: 'no-cache'
  }) as ChangeMyPasswordResponse;
};

export default customerChangeMyPassword;
