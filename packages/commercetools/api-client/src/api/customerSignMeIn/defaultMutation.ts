import gql from 'graphql-tag';
import { CustomerFragment, CartFragment } from '../../fragments';

export default gql`
  ${CustomerFragment}
  ${CartFragment}

  mutation customerSignMeIn($draft: CustomerSignMeInDraft!, $locale: Locale!, $acceptLanguage: [Locale!], $storeKey: KeyReferenceInput) {
    user: customerSignMeIn(draft: $draft, storeKey: $storeKey) {
      customer {
        ...DefaultCustomer
      }
      cart {
        ...DefaultCart
      }
    }
  }
`;
