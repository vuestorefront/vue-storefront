import gql from 'graphql-tag';
import { OrderFragment } from '../../fragments';

export default gql`
  ${OrderFragment}

  mutation createMyOrderFromCart($draft: OrderMyCartCommand!, $locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!, $storeKey: KeyReferenceInput) {
    order: createMyOrderFromCart(draft: $draft, storeKey: $storeKey) {
      ...DefaultOrder
    }
  }
`;
