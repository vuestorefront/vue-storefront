import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import config from 'config'
import routes from './router'

export default function (app, router, store) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}
