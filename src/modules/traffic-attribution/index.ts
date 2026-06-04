import { MutationPayload } from 'vuex';

import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';
import { localStorageSynchronizationFactory } from 'src/modules/shared';

import { cacheHandlerFactory } from './helpers/cache-handler.factory';
import { getItemsFromStorageFactory } from './helpers/get-local-storage-items.function';
import { trafficAttributionStore } from './store';
import { MODULE_NAME } from './types/store-name';
import { REPORT_TRAFFIC_ATTRIBUTION, SYNCHRONIZE } from './types/actions';

export const TrafficAttributionModule: StorefrontModule = function ({ store, router }) {
  store.registerModule(MODULE_NAME, trafficAttributionStore);

  if (isServer) {
    return;
  }

  StorageManager.init(MODULE_NAME);

  const storage = StorageManager.get(MODULE_NAME);

  const localStorageSynchronization = localStorageSynchronizationFactory(
    getItemsFromStorageFactory(store),
    cacheHandlerFactory(storage)
  );

  store.subscribe((mutation: MutationPayload) => {
    localStorageSynchronization.setItems(mutation);
  });

  EventBus.$on('cart-connected', () => {
    store.dispatch(`${MODULE_NAME}/${REPORT_TRAFFIC_ATTRIBUTION}`);
  });

  EventBus.$on('cart-created', () => {
    store.dispatch(`${MODULE_NAME}/${REPORT_TRAFFIC_ATTRIBUTION}`);
  });

  store.dispatch(`${MODULE_NAME}/${SYNCHRONIZE}`, router);
};
