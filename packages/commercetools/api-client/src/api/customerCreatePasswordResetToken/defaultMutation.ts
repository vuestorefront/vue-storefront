import gql from 'graphql-tag';

export default gql`
  mutation customerCreatePasswordResetToken($email: String!, $storeKey: KeyReferenceInput) {
    customerCreatePasswordResetToken(email: $email, storeKey: $storeKey) {
      customerId
      expiresAt
      value
      id
      version
      createdAt
      lastModifiedAt
      createdBy {
        isPlatformClient
        externalUserId
        anonymousId
        clientId
        customerRef {
          typeId
          id
        }
        userRef {
          typeId
          id
        }
      }
      lastModifiedBy {
        isPlatformClient
        externalUserId
        anonymousId
        clientId
        customerRef {
          typeId
          id
        }
        userRef {
          typeId
          id
        }
      }
    }
  }
`;
