import {
  ComputedProperty,
  configureFactoryParams,
  Context, CustomQuery,
  FactoryParams,
  Logger, PlatformApi,
  sharedRef
} from '@vue-storefront/core';

export interface UseInventory<INVENTORY> {
  entries: ComputedProperty<INVENTORY[]>;
  inventory_entry: ComputedProperty<INVENTORY>;
  load: (context: Context, params: { id: string } & { customQuery?: CustomQuery }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  search: (context: Context, params: Record<string, string> & { customQuery?: CustomQuery }) => Promise<void>;
}

export interface UseInventoryFactoryParams<INVENTORY, API extends PlatformApi = any> extends FactoryParams<API>{
  load: (context: Context, params: { id: string }) => Promise<INVENTORY>;
  search: (context: Context, params: Record<any, any>) => Promise<INVENTORY>;
}

export function useInventoryFactory<INVENTORY>(
  factoryParams: UseInventoryFactoryParams<INVENTORY>
) {
  return function useInventory(id = ''): UseInventory<INVENTORY> {
    const ssrKey = id || 'useInventoryFactory';
    const loading = sharedRef<boolean>(false, `useInventory-loading-${ssrKey}`);
    const entry = sharedRef<INVENTORY>(null, `useInventory-entry-${ssrKey}`);
    const entries = sharedRef<INVENTORY[]>([], `useInventory-entries-${ssrKey}`);
    const _factoryParams = configureFactoryParams(factoryParams);

    const load = async (context: Context, params: { id: string }) => {
      Logger.debug(`useInventory/${ssrKey}/load`);
      loading.value = true;

      try {
        entry.value = await _factoryParams.load({ ...params });
      } finally {
        loading.value = false;
      }
    };

    const search = async (searchParams: Record<any, any>) => {
      Logger.debug(`useInventory/${ssrKey}/search`);
      loading.value = true;

      try {
        entries.value = await _factoryParams.search({ ...searchParams });
      } finally {
        loading.value = false;
      }
    };

    return {
      search,
      load,
      loading,
      entries,
      inventory_entry: entry
    };
  };
}
