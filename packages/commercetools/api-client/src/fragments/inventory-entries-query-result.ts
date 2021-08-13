import { InventoryEntryFragment } from './inventory';

export const InventoryEntriesQueryResultFragment = `
  ${InventoryEntryFragment}

  fragment InventoryEntriesQueryResultFragment on InventoryEntryQueryResult {
    offset
    count
    total
    results {
      ...InventoryEntryFragment
    }
  }
`;
