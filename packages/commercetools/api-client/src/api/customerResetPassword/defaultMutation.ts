import gql from 'graphql-tag';
import { CustomerFragment } from '../../fragments';

export default gql`
  ${CustomerFragment}

  mutation customerResetPassword($tokenValue: String!, $newPassword: String!, $storeKey: KeyReferenceInput) {
    customerResetPassword(tokenValue: $tokenValue, newPassword: $newPassword, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
