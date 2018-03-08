import Home from './pages/Home.vue'
import Product from './pages/Product.vue'
import Category from './pages/Category.vue'

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/p/:parentSku/:slug/:childSku', component: Product, name: 'product' },
  { path: '/c/:slug', component: Category, name: 'category' }
]

export default function (app, router, store) {
  router.addRoutes(routes)
}
