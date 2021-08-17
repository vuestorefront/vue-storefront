import {
  ComputedProperty,
  configureFactoryParams,
  Context, CustomQuery,
  FactoryParams,
  Logger,
  sharedRef
} from '@vue-storefront/core';

export interface UseInventory<INVENTORY> {
  entries: ComputedProperty<INVENTORY[]>;
  inventory_entry: ComputedProperty<INVENTORY>;
  load: (context: Context, params: { id: string } & { customQuery?: CustomQuery }) => Promise<void>;
  loading: ComputedProperty<boolean>;
  search: (context: Context, params: Record<string, string> & { customQuery?: CustomQuery }) => Promise<void>;
}

export interface UseInventoryFactoryParams<INVENTORY> extends FactoryParams{
  load: (context: Context, params: { id: string }) => Promise<INVENTORY>;
  search: (context: Context, params: Record<string, string>) => Promise<INVENTORY[]>;
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

    const load = async (params: { id: string }) => {
      Logger.debug(`useInventory/${ssrKey}/load`);
      loading.value = true;

      try {
        entry.value = await _factoryParams.load(params);
      } finally {
        loading.value = false;
      }
    };

    const search = async (params: Record<string, string>) => {
      Logger.debug(`useInventory/${ssrKey}/search`);
      loading.value = true;

      try {
        entries.value = await _factoryParams.search(params);
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
