import gql from 'graphql-tag';

export default gql`
  query SearchCategories(
    $storeId: String!
    $userId: String!
    $filter: String!
    $currencyCode: String!
  ) {
    categories(
      currencyCode: $currencyCode
      filter: $filter
      storeId: $storeId
      userId: $userId
    ) {
      items {
        id
        name
        code
        slug
        path
        outline
      }
      totalCount
    }
  }
`;
