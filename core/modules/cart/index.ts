// import { cartStore } from './store'
// import { createModule } from '@vue-storefront/core/lib/module'
// import { beforeRegistration } from './hooks/beforeRegistration'
// import { afterRegistration } from './hooks/afterRegistration'

// export const KEY = 'cart'
// export const Cart = createModule({
//   key: KEY,
//   store: { modules: [{ key: KEY, module: cartStore }] },
//   beforeRegistration,
//   afterRegistration
// })
import { afterAppInitHook } from '@vue-storefront/module/hooks'
import { StorefrontModule } from "@vue-storefront/module"
import { cartStore } from './store'
import * as localForage from 'localforage'
import UniversalStorage from '@vue-storefront/core/store/lib/storage'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { cartCacheHandlerFactory } from './helpers/cartCacheHandler';
import { isServer } from '@vue-storefront/core/helpers'
import Vue from 'vue'

export const CartModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  const storeView = currentStoreView()
  const dbNamePrefix = storeView.storeCode ? storeView.storeCode + '-' : ''
  // TODO: don't use Vue.prototype
  Vue.prototype.$db.cartsCollection = new UniversalStorage(localForage.createInstance({
    name: (appConfig.storeViews.commonCache ? '' : dbNamePrefix) + 'shop',
    storeName: 'carts',
    driver: localForage[appConfig.localForage.defaultDrivers['carts']]
  }))

  store.registerModule('cart', cartStore)

  afterAppInitHook(async () => {
    if (!isServer) await store.dispatch('cart/load')
    store.subscribe(cartCacheHandlerFactory(Vue))
  })
}
