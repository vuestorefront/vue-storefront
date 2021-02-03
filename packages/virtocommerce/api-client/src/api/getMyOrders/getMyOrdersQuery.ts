import gql from 'graphql-tag';

export default gql`
  query GetMyOrders(
    $userId: String!
    $filter: String!
    $after: String
    $first: Int
  ) {
    orders(userId: $userId, filter: $filter, after: $after, first: $first) {
      totalCount
      items {
        id
        createdDate
        status
        items {
          sku
          name
          quantity
          price { amount }
        }
        currency {
          code
        }
        total {
          amount
        }
        number
        customerId
      }
    }
  }
`;
