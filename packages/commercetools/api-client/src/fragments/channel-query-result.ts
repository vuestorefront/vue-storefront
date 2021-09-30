import { ChannelFragment } from './channel';

export const ChannelQueryResultFragment = `
  ${ChannelFragment}

  fragment InventoryEntriesQueryResultFragment on InventoryEntryQueryResult {
    offset
    count
    total
    results {
      ...ChannelFragment
    }
  }
`;
