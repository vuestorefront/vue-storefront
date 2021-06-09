import gql from 'graphql-tag';

export default gql`
  mutation customerResetPassword($tokenValue: String!, $newPassword: String!, $storeKey: KeyReferenceInput) {
    customerResetPassword(tokenValue: $tokenValue, newPassword: $newPassword, storeKey: $storeKey) {
      id
    }
  }
`;
