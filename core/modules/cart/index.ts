import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { cartStore } from './store'
import { cartCacheHandlerFactory } from './helpers';
import { isServer } from '@vue-storefront/core/helpers'
import Vue from 'vue'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

export const CartModule: StorefrontModule = function ({ store }) {
  StorageManager.init('cart')

  store.registerModule('cart', cartStore)

  if (!isServer) store.dispatch('cart/load')
  store.subscribe(cartCacheHandlerFactory(Vue))
}
