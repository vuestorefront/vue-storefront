import { Context, CustomQuery } from '@vue-storefront/core';
import { StoresData, StoresItem } from '../types';

// Types
export interface ChangeParam {
  item: StoresItem;
}

export interface UseStoreFactoryChangeParams {
  current: StoresData;
  next: ChangeParam;
  customQuery?: CustomQuery;
}

// Load param
async function load (context: Context, params): Promise<StoresData> {
  const { api, config } = context.$ct;
  const { customQuery } = params;
  return { ...await api.getStores({ customQuery }), _selected: config.store };
}

// Change param
async function change (context: Context, { next }: UseStoreFactoryChangeParams): Promise<StoresData> {
  context.$ct.config.stores.changeCurrentStore(next?.item?.id);
  window.location.reload();
  return null as StoresData;
}

export default { load, change };
