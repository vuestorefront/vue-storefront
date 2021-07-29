import gql from 'graphql-tag';
import { OrderFragment } from '../../fragments';

export default gql`
  ${OrderFragment}

  query getMyOrders($where: String, $sort: [String!], $limit: Int, $offset: Int, $locale: Locale!, $acceptLanguage: [Locale!], $currency: Currency!) {
    me {
      orders(where: $where, sort: $sort, limit: $limit, offset: $offset) {
        results {
          ...DefaultOrder
        }
        total
      }
    }
  }
`;
