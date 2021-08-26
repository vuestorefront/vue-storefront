import gql from 'graphql-tag';
import { ShippingMethodFragment } from '../../fragments';

export default gql`
  ${ShippingMethodFragment}

  query shippingMethods($acceptLanguage: [Locale!], $cartId: String!) {
    shippingMethods: shippingMethodsByCart(id: $cartId) {
      ...DefaultShippingMethod
    }
  }
`;
