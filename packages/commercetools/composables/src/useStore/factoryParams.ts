import { Context, CustomQuery } from '@vue-storefront/core';
import { StoreKey } from '@vue-storefront/commercetools-api';
import { StoreQueryResult } from '../types/GraphQL';

// Types
export interface ChangeParam {
  key: StoreKey;
}

export interface UseStoreFactoryChangeParams {
  current: StoreQueryResult;
  next: ChangeParam;
  customQuery?: CustomQuery;
}

// Load param
async function load (context: Context, params): Promise<StoreQueryResult> {
  const { api } = context.$ct;
  const { customQuery } = params;

  return api.getStores(customQuery);
}

// Change param
async function change (context: Context, { next }): Promise<StoreQueryResult> {
  context.$ct.config.stores.changeCurrentStoreKey(next.key);
  window.location.reload();
  return null as StoreQueryResult;
}

export default { load, change };
