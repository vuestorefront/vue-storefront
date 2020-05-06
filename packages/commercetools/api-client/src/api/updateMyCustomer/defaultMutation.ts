import gql from 'graphql-tag';
import { CustomerFragment, CartFragment } from '../../fragments';

export default gql`
  ${CustomerFragment}
  ${CartFragment}

  mutation updateMyCustomer($version: Long!, $actions: [MyCustomerUpdateAction!]!, $locale: Locale!, $storeKey: KeyReferenceInput) {
    customer: updateMyCustomer(version: $version, actions: $actions, storeKey:  $storeKey) {
      ...DefaultCustomer
    }
  }
`;
