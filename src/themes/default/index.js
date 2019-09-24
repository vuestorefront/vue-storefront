import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'
import { once } from '@vue-storefront/core/helpers'
import { module as cartModule } from './store/cart'

import { claimsStore } from 'theme/store/claims'
import { homepageStore } from 'theme/store/homepage'
import { uiStore } from 'theme/store/ui'
import { promotedStore } from 'theme/store/promoted-offers'
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar)
})

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  store.registerModule('themeCart', cartModule)
  // Register theme routes for the current store. In a single store setup this will add routes exactly as they are in the router definition file '[theme]/router/index.js'
  // In a multistore setup, it depends on the config setting 'appendStoreCode' for the current store
  // - true = the store code will be added to the front of all routes, e.g. name: 'de-checkout', path: '/de/checkout'
  // - false = the store code will not be added. In this case you need to define custom routes for each of your stores
  // You can also define custom routes to use a different component, for example for German storeView checkout
  // To do so, exclude the desired storeView from the config.storeViews.mapStoreUrlsFor, set appendStoreCode = false, and map all the urls by your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized }
  // The 4th parameter is the route priority - a higher number will ensure the theme routes override any module routes. The default is 0.
  setupMultistoreRoutes(config, router, routes, 10)

  StorageManager.init('claims');
  store.registerModule('claims', claimsStore);
  store.registerModule('homepage', homepageStore);
  store.registerModule('ui', uiStore);
  store.registerModule('promoted', promotedStore);
}

export {
  themeEntry,
  initTheme
}
