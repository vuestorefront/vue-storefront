import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/c/:slug', component: Category },
    { path: '/p/:parentSku/:slug/:childSku', component: Product }
]

export default function (app, router, store) {
  router.addRoutes(routes)
  return
}
