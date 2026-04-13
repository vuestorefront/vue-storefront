import Vue from 'vue'
import VueGtm from '@gtm-support/vue2-gtm'
import { Store } from 'vuex'
import { isServer } from '@vue-storefront/core/helpers'
import VueRouter from 'vue-router'

import EventBusListener from '../helpers/EventBusListener'

export const isEnabled = (gtmId: string | null) => {
  return typeof gtmId === 'string' && gtmId.length > 0 && !isServer
}

export function afterRegistration (config, store: Store<any>) {
  if (isEnabled(config.googleTagManager.id)) {
    const GTM: typeof VueGtm = (Vue as any).gtm

    const eventBusListener = new EventBusListener(store, GTM);
    eventBusListener.initEventBusListeners();
  }
}
