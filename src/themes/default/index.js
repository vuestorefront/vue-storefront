import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { once } from '@vue-storefront/core/helpers'

import { initCacheStorage } from '@vue-storefront/core/helpers/initCacheStorage';
import { store as claimsStore } from 'theme/store/claims'
import { store as homeStore } from 'theme/store/homepage'
import { store as uiStore } from 'theme/store/ui'
import { store as promotedStore } from 'theme/store/promoted-offers'

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar)
})

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)

  Vue.prototype.$db.claimsCollection = initCacheStorage('claims');
  store.registerModule('claims', claimsStore);
  store.registerModule('homepage', homeStore);
  store.registerModule('ui', uiStore);
  store.registerModule('promoted', promotedStore);
}

export {
  themeEntry,
  initTheme
}
