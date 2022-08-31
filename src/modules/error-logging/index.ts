import { isServer } from 'core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { afterRegistration } from './hooks/afterRegistration';
import LOCAL_STORAGE_KEY from './type/LocalStorageKey';

export const ErrorLoggingModule: StorefrontModule = function ({ appConfig }) {
  if (isServer) {
    return;
  }

  StorageManager.init(LOCAL_STORAGE_KEY);

  afterRegistration(appConfig)
}
