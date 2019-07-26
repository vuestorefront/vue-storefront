import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
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
  // If you're running multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please exclude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  store.registerModule('themeCart', cartModule)
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)

  StorageManager.init('claimCollection');
  store.registerModule('claims', claimsStore);
  store.registerModule('homepage', homepageStore);
  store.registerModule('ui', uiStore);
  store.registerModule('promoted', promotedStore);
}

export {
  themeEntry,
  initTheme
}
