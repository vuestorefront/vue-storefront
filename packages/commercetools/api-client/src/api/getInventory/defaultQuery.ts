import gql from 'graphql-tag';
import { InventoryEntriesQueryResultFragment } from './../../fragments';

const inventoryEntriesData = gql`
  ${InventoryEntriesQueryResultFragment}

  query inventoryEntries(
    $where: String
    $sort: [String!]
    $limit: Int
    $offset: Int
  ) {
    inventoryEntries(
      where: $where
      sort: $sort
      limit: $limit
      offset: $offset
    ) {
      ...InventoryEntriesQueryResultFragment
    }
  }
`;

export { inventoryEntriesData };
