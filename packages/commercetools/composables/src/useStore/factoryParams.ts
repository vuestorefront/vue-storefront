import {
  Context,
  UseStoreFactoryParams,
  UseStoreFactoryLoadParamArguments,
  UseStoreFactoryChangeParamArguments, CustomQuery
} from '@vue-storefront/core';
import { StoresData } from '../types';
import { ResourceIdentifierInput } from '../types/GraphQL';

export interface UseStoreFactoryChangeChannelParamArguments {
  channel: Record<string, ResourceIdentifierInput>;
  customQuery?: CustomQuery;
}

export interface CtUseStoreFactoryParams<STORES> extends UseStoreFactoryParams<STORES> {
  changeChannel(context: Context, params: UseStoreFactoryChangeChannelParamArguments): Promise<STORES>
}

async function load (context: Context, params: UseStoreFactoryLoadParamArguments): Promise<StoresData> {
  const { api, config } = context.$ct;
  const { customQuery } = params;

  return {
    ...await api.getStores({ customQuery }),
    _selectedStore: config.store
  };
}

async function change (context: Context, { store }: UseStoreFactoryChangeParamArguments) {
  context.$ct.config.storeService.changeCurrentStore(`${store.key}`);
  window.location.reload();
  return null as StoresData;
}

async function changeChannel (context: Context, { channel }: UseStoreFactoryChangeChannelParamArguments) {
  context.$ct.config.storeService.changeCurrentStore(`${(channel.distributtionChannel || 'null')}-${(channel.supplyChannel || 'null')}`);
  window.location.reload();
  return null as StoresData;
}

/**
 * @remarks References:
 * {@link StoresData}
 */
const factoryParams: CtUseStoreFactoryParams<StoresData> = { load, change, changeChannel };

export default factoryParams;
