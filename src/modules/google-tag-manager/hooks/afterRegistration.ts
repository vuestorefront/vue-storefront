import Vue from 'vue'
import VueGtm from 'vue-gtm'
import { Store } from 'vuex'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { isServer } from '@vue-storefront/core/helpers'
import VueRouter from 'vue-router'

import Product from 'core/modules/catalog/types/Product'

import EventBusListener from '../helpers/EventBusListener'
import StoreMutationsListener from '../helpers/StoreMutationsListener'

export const isEnabled = (gtmId: string | null) => {
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer
}

export function afterRegistration (config, store: Store<any>, router: VueRouter) {
  if (isEnabled(config.googleTagManager.id)) {
    const GTM: typeof VueGtm = (Vue as any).gtm

    router.afterEach(() => {
      const loggedUser = store.state.user.current;

      if (!loggedUser) {
        return;
      }

      GTM.trackEvent({
        customerEmail: loggedUser.email,
        customerFullName: `${loggedUser.firstname} ${loggedUser.lastname}`,
        customerId: loggedUser.id
      })
    });

    const eventBusListener = new EventBusListener(store, GTM);
    eventBusListener.initEventBusListeners();

    const storeMutationsListener = new StoreMutationsListener(store, GTM);
    storeMutationsListener.initStoreMutationsListener();
  }
}
