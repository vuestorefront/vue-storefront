import gql from 'graphql-tag'
import { CustomerFragment } from './../../fragments'

export default gql`
  ${CustomerFragment}

  mutation customerSignMeUp($draft: CustomerSignMeUpDraft!, $storeKey: KeyReferenceInput) {
    user: customerSignMeUp(draft: $draft, storeKey: $storeKey) {
      customer {
        ...DefaultCustomer
      }
    }
  }
`;
