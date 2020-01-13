// import router from '@vue-storefront/core/router'
// uncomment if you want to modify the router e.g. add before/after hooks
import Category from '../pages/Category.vue'
import Product from '../pages/Product.vue'
import { RouteConfig } from 'vue-router'
let routes: RouteConfig[] = [
]
routes = routes.concat([{ name: 'virtual-product-amp', path: '/amp/p/:parentSku/:slug', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'bundle-product-amp', path: '/amp/p/:parentSku/:slug', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'simple-product-amp', path: '/amp/p/:parentSku/:slug', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'downloadable-product-amp', path: '/amp/p/:parentSku/:slug', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'grouped-product-amp', path: '/amp/p/:parentSku/:slug', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'configurable-product-amp', path: '/amp/p/:parentSku/:slug/:childSku', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'product-amp', path: '/amp/p/:parentSku/:slug/:childSku', component: Product, meta: { layout: 'minimal' } }, // :sku param can be marked as optional with ":sku?" (https://github.com/vuejs/vue-router/blob/dev/examples/route-matching/app.js#L16), but it requires a lot of work to adjust the rest of the site
  { name: 'category-amp', path: '/amp/c/:slug', component: Category }])
export default routes
