import gql from 'graphql-tag';

export default gql`
  mutation customerCreatePasswordResetToken($email: String!, $storeKey: KeyReferenceInput) {
    customerCreatePasswordResetToken(email: $email, storeKey: $storeKey) {
      value
    }
  }
`;
