import gql from 'graphql-tag';
import { StoreQueryResultFragment } from './../../fragments';

const storesData = gql`
  ${StoreQueryResultFragment}

  query stores(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
    $locale: Locale!
  ) {
    stores(
      where: $where
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      ...StoreQueryResultFragment
    }
  }
`;

export { storesData };
