import gql from 'graphql-tag';

const productsList = gql`
  query productsList(
  $filter: String!,
  $storeId: String!,
  $userId: String!,
  ) {
    products(
      filter: $filter
      storeId: $storeId
      userId: $userId
    ) {
      items
      {
        id
        name    
        code
        name
        imgSrc
        slug
      }
    totalCount
  }
  }
`;

export { productsList };
