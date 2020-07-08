import gql from 'graphql-tag';
import { CustomerFragment, CartFragment } from './../../fragments';

export default gql`
  ${CustomerFragment}
  ${CartFragment}

  mutation customerSignMeUp($draft: CustomerSignMeUpDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {
    user: customerSignMeUp(draft: $draft, storeKey: $storeKey) {
      customer {
        ...DefaultCustomer
      }
      cart {
        ...DefaultCart
      }
    }
  }
`;
