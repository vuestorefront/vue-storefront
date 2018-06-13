import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'
import config from 'config'
const Home = () => import(/* webpackChunkName: "page-Home", webpackPrefetch: true */'./pages/Home.vue')
const Category = () => import(/* webpackChunkName: "page-Category", webpackPrefetch: true */'./pages/Category.vue')
const Product = () => import(/* webpackChunkName: "page-Product", webpackPrefetch: true */'./pages/Product.vue')
const Checkout = () => import(/* webpackChunkName: "page-Checkout", webpackPrefetch: true */'./pages/Checkout.vue')
const Compare = () => import(/* webpackChunkName: "page-Compare", webpackPrefetch: true */'./pages/Compare.vue')
const MyAccount = () => import(/* webpackChunkName: "page-MyAccount", webpackPrefetch: true */'./pages/MyAccount.vue')
const Static = () => import(/* webpackChunkName: "page-Static", webpackPrefetch: true */'./pages/Static.vue')
const PageNotFound = () => import(/* webpackChunkName: "page-PageNotFound", webpackPrefetch: true */'./pages/PageNotFound.vue')

const routes = [
  { name: 'home', path: '/', component: Home, alias: '/pwa.html' },
  { name: 'checkout', path: '/checkout', component: Checkout },
  { name: 'category', path: '/c/:slug', component: Category },
  { name: 'virtual-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'bundle-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'simple-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'downloadable-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'grouped-product', path: '/p/:parentSku/:slug', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'configurable-product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product', path: '/p/:parentSku/:slug/:childSku', component: Product }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'legal', path: '/legal', component: Static, props: {page: 'lorem', title: 'Legal Notice'}, meta: {title: 'Legal Notice', description: 'Legal Notice - example of description usage'} },
  { name: 'privacy', path: '/privacy', component: Static, props: {page: 'lorem', title: 'Privacy'} },
  { name: 'magazine', path: '/magazine', component: Static, props: {page: 'lorem', title: 'Magazine'} },
  { name: 'sale', path: '/sale', component: Static, props: {page: 'lorem', title: 'Sale'} },
  { name: 'order-tracking', path: '/order-tracking', component: Static, props: {page: 'lorem', title: 'Track my Order'} },
  { name: 'my-account', path: '/my-account', component: MyAccount },
  { name: 'my-shipping-details', path: '/my-account/shipping-details', component: MyAccount, props: {activeBlock: 'MyShippingDetails'} },
  { name: 'my-newsletter', path: '/my-account/newsletter', component: MyAccount, props: {activeBlock: 'MyNewsletter'} },
  { name: 'my-orders', path: '/my-account/orders', component: MyAccount, props: {activeBlock: 'MyOrders'} },
  { name: 'my-order', path: '/my-account/orders/:orderId', component: MyAccount, props: {activeBlock: 'MyOrder'} },
  { name: 'about-us', path: '/about-us', component: Static, props: {page: 'about', title: 'About us'} },
  { name: 'customer-service', path: '/customer-service', component: Static, props: {page: 'lorem', title: 'Customer service'} },
  { name: 'store-locator', path: '/store-locator', component: Static, props: {page: 'lorem', title: 'Store locator'} },
  { name: 'size-guide', path: '/size-guide', component: Static, props: {page: 'lorem', title: 'Size guide'} },
  { name: 'gift-card', path: '/gift-card', component: Static, props: {page: 'lorem', title: 'Gift card'} },
  { name: 'delivery', path: '/delivery', component: Static, props: {page: 'lorem', title: 'Delivery'} },
  { name: 'returns', path: '/returns', component: Static, props: {page: 'lorem', title: 'Returns policy'} },
  { name: 'order-from-catalog', path: '/order-from-catalog', component: Static, props: {page: 'lorem', title: 'Order from catalog'} },
  { name: 'contact', path: '/contact', component: Static, props: {page: 'contact', title: 'Contact'} },
  { name: 'compare', path: '/compare', component: Compare, props: {title: 'Compare Products'} },
  { name: 'page-not-found', path: '/page-not-found', component: PageNotFound }
]

export default function (app, router, store) {
  // if youre' runing multistore setup this is copying the routed above adding the 'storeCode' prefix to the urls and the names of the routes
  // You can do it on your own and then be able to customize the components used for example for German storeView checkout
  // To do so please execlude the desired storeView from the config.storeViews.mapStoreUrlsFor and map the urls by Your own like:
  // { name: 'de-checkout', path: '/checkout', component: CheckoutCustomized },
  setupMultistoreRoutes(config, router, routes)
  router.addRoutes(routes)
  import(/* webpackChunkName: "store-UI" */'./store/ui-store').then(UIStore => {
    store.registerModule('ui', UIStore)
  })
}
