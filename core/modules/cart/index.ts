import { afterAppInitHook } from '@vue-storefront/module/hooks'
import { StorefrontModule } from '@vue-storefront/module'
import { cartStore } from './store'
import { cartCacheHandlerFactory } from './helpers/cartCacheHandler';
import { isServer } from '@vue-storefront/core/helpers'
import Vue from 'vue'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage'

export const CartModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  Vue.prototype.$db.cartsCollection = initCacheStorage('carts')
  store.registerModule('cart', cartStore)

  afterAppInitHook(async () => {
    if (!isServer) await store.dispatch('cart/load')
    store.subscribe(cartCacheHandlerFactory(Vue))
  })
}
