import { isServer } from '@vue-storefront/core/helpers';
import { AsyncDataLoader } from '@vue-storefront/core/lib/async-data-loader';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { afterRegistration } from './hooks/afterRegistration';
import { module } from './store';
import LOCAL_STORAGE_KEY from './type/LocalStorageKey';
import { SET_TRACE_ID, SN_ERROR_LOGGING } from './type/StoreMutations';

export const ErrorLoggingModule: StorefrontModule = function ({ appConfig, store }) {
  store.registerModule(SN_ERROR_LOGGING, module);

  if (isServer) {
    AsyncDataLoader.push({
      execute: async ({ context }: {context: any}) => {
        const headers = context?.server?.request?.headers;

        if (!headers || !headers['x-amzn-trace-id']) {
          return;
        }

        store.commit(`${SN_ERROR_LOGGING}/${SET_TRACE_ID}`, headers['x-amzn-trace-id']);
      }
    })

    return;
  }

  StorageManager.init(LOCAL_STORAGE_KEY);

  afterRegistration(appConfig)
}
