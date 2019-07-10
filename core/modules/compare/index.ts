import { compareStore } from './store'
import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { plugin } from './store/plugin'
import { StorefrontModule } from '@vue-storefront/module';
import Vue from 'vue';

const KEY = 'compare'
export const cacheStorage = initCacheStorage(KEY)
export const CompareModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  Vue.prototype.$db.cartsCollection = initCacheStorage('compare')

  store.registerModule(KEY, compareStore)
  store.subscribe(plugin)
}
