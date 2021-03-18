import gql from 'graphql-tag';
import { CartFragment, CustomerFragment } from './../../fragments';

const basicProfile = gql`
  ${CartFragment}

  query getBasicProfile($locale: Locale!, $acceptLanguage: [Locale!]) {
    me {
      activeCart {
        ...DefaultCart
      }
    }
  }
`;

const fullProfile = gql`
  ${CartFragment}
  ${CustomerFragment}

  query getFullProfile($locale: Locale!, $acceptLanguage: [Locale!]) {
    me {
      activeCart {
        ...DefaultCart
      }
      customer {
        ...DefaultCustomer
      }
    }
  }
`;

export { basicProfile, fullProfile };
