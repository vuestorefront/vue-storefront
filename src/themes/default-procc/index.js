import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import Vue from 'vue'
import VueProgressBar from 'vue-progressbar'
import '@vue-storefront/core/lib/passive-listeners'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { once } from '@vue-storefront/core/helpers'

// Added ProCCAPI to global
import config from 'config'
import ProCcApi from './helpers/procc_api.js'

once('__VUE_EXTEND_DROPPOINT_VPB__', () => {
  Vue.use(VueProgressBar)
  Vue.prototype.ProCcAPI = ProCcApi() // Added by Dan to enable ProCC API
  Vue.prototype.config = config // Added by Dan to enable ProCC API
})

const themeEntry = App
function initTheme (app, router, store, config, ssrContext) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}
