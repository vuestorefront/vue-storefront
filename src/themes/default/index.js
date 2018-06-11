import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'
import Static from './pages/Static.vue'
import Checkout from './pages/Checkout.vue'
import Compare from './pages/Compare.vue'
import PageNotFound from './pages/PageNotFound.vue'
import MyAccount from './pages/MyAccount.vue'
import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'
import config from 'config'
import routes from './router'

export default function (app, router, store) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  router.addRoutes(routes)
}
