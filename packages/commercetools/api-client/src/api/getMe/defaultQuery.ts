import gql from 'graphql-tag'
import { CartFragment, CustomerFragment } from './../../fragments'

const basicProfile = gql`
  ${CartFragment}

  query getMe($locale: Locale!) {
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

  query getMe($locale: Locale!) {
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

export { basicProfile, fullProfile }
