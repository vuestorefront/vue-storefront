import gql from 'graphql-tag'
import { CartFragment, CustomerFragment } from './../../fragments'

export default gql`
  ${CartFragment}

  query getMe($locale: Locale!) {
    me {
      activeCart {
        ...DefaultCart
      }
    }
  }
`;
