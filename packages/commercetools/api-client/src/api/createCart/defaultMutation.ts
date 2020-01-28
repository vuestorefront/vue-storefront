import gql from 'graphql-tag'
import { CartFragment } from './../../fragments'

export default gql`
  ${CartFragment}

  mutation createCart($draft: MyCartDraft!, $locale: Locale!, $storeKey: KeyReferenceInput) {
    cart: createMyCart(draft: $draft, storeKey: $storeKey) {
      ...DefaultCart
    }
  }
`;
