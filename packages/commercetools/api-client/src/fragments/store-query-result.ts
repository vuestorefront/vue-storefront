import { StoreFragment } from './store';

export const StoreQueryResultFragment = `
  ${StoreFragment}

  fragment StoreQueryResultFragment on StoreQueryResult {
    offset
    count
    total
    results {
      ...StoreFragment
    }
  }
`;
