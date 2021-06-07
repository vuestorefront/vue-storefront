import { Context, CustomQuery } from '@vue-storefront/core';
import { StoreQueryResult } from '../types/GraphQL';

// Types
export interface ChangeParam {
  id: string;
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
  context.$ct.config.stores.changeCurrentStore(next.id);
  window.location.reload();
  return null as StoreQueryResult;
}

export default { load, change };
