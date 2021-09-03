import gql from 'graphql-tag';
import { CartFragment } from './../../fragments';

export default gql`
    ${CartFragment}

    mutation deleteCart($id: String!, $version: Long!, $locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!) {
        cart: deleteMyCart(id: $id, version: $version) {
            ...DefaultCart
        }
    }
`;
