import { Context, CustomQuery } from '@vue-storefront/core';
import { StoreKey } from '@vue-storefront/commercetools-api';
import { Store } from '../types/GraphQL';

// Types
export interface ChangeParam {
  key: StoreKey;
}

export interface UseStoreFactoryChangeParams {
  current: Store;
  next: ChangeParam;
  customQuery?: CustomQuery;
}

// Helpers
// function isSingleStore (store: string | string[]): store is string {
//   return !Array.isArray(store);
// }

// Load param
async function load (context: Context, params): Promise<Store> {
  const { api /* , config: { store } */ } = context.$ct;
  const { customQuery } = params;

  // return isSingleStore(store)
  //   ? api.getStore({key: store}, customQuery)
  //   : api.getStores({keys: store}, customQuery);

  return api.getStores({keys: []}, customQuery);
}

// Change param
async function change (context: Context, { next }): Promise<Store> {
  context.$ct.config.stores.changeCurrentStoreKey(next.key);
  window.location.reload();
  return null as Store;
}

export default { load, change };
