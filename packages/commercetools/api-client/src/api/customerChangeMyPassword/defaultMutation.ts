import gql from 'graphql-tag';
import { CustomerFragment } from '../../fragments';

export default gql`
  ${CustomerFragment}

  mutation customerChangeMyPassword($version: Long!, $currentPassword: String!, $newPassword: String!, $storeKey: KeyReferenceInput) {
    user: customerChangeMyPassword(version: $version, currentPassword: $currentPassword, newPassword: $newPassword, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
