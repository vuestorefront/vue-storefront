import { StorefrontModule } from '@vue-storefront/module'
import { cartStore } from './store'
import { cartCacheHandlerFactory } from './helpers/cartCacheHandler';
import { isServer } from '@vue-storefront/core/helpers'
import Vue from 'vue'
import { StorageManager } from '@vue-storefront/core/store/lib/storage-manager'

export const CartModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  StorageManager.init('cart')

  store.registerModule('cart', cartStore)

  if (!isServer) store.dispatch('cart/load')
  store.subscribe(cartCacheHandlerFactory(Vue))
}
