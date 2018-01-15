import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/c/:name', component: Category },
    { path: '/p/:name', component: Product }
]

export default function (app, router, store) {
  router.addRoutes(routes)
  return
}
