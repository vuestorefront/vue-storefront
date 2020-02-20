import gql from 'graphql-tag';
import { CartFragment } from './../../fragments';

export default gql`
  ${CartFragment}

  mutation updateCart($id: String!, $version: Long!, $actions: [MyCartUpdateAction!]!, $locale: Locale!) {
    cart: updateMyCart(id: $id, version: $version, actions: $actions) {
      ...DefaultCart
    }
  }
`;
