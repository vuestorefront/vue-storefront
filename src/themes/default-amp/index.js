import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import routes from './router'

export default function (app, router, store) {
  // if you're running multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please exclude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes, 10)
}
