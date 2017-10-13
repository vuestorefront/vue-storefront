import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'
import Test from './pages/Static.vue'

const routes = [
    { path: '/', component: Home },
    { name: 'category', path: '/c/:slug', component: Category },
    { name: 'product', path: '/p/:id/:slug', component: Product },
    { name: 'legal', path: '/legal', component: Test, props: {url: 'https://github.com/DivanteLtd/vue-storefront/blob/master/README.md'} },
    { name: 'privacy', path: '/privacy', component: Test, props: {url: 'https://github.com/DivanteLtd/vue-storefront/blob/master/README.md'} }
]

export default function (app, router) {
  router.addRoutes(routes)
  return
}
