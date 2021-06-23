import { Context, UseStoreFactoryParams, UseStoreFactoryChangeParamArguments, UseStoreFactoryLoadParamArguments } from '@vue-storefront/core';
import { StoresData } from '../types';

// Load param
async function load (context: Context, params: UseStoreFactoryLoadParamArguments): Promise<StoresData> {
  const { api, config } = context.$ct;
  const { customQuery } = params;
  return { ...await api.getStores({ customQuery }), _selected: config.store };
}

// Change param
async function change (context: Context, { store }: UseStoreFactoryChangeParamArguments) {
  context.$ct.config.storeService.changeCurrentStore(store.id);
  window.location.reload();
  return null as StoresData;
}

const factoryParams: UseStoreFactoryParams<StoresData> = { load, change };
export default factoryParams;
