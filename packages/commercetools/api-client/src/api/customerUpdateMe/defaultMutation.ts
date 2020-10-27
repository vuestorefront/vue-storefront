import gql from 'graphql-tag';
import { CustomerFragment } from '../../fragments';

export default gql`
  ${CustomerFragment}

  mutation customerUpdateMe($version: Long!, $actions: [MyCustomerUpdateAction!]!, $storeKey: KeyReferenceInput) {
    user: updateMyCustomer(version: $version, actions: $actions, storeKey: $storeKey) {
      ...DefaultCustomer
    }
  }
`;
