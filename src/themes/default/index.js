import Home from './pages/Home.vue'
import Category from './pages/Category.vue'
import Product from './pages/Product.vue'

const routes = [
    { path: '/', component: Home },
    { name: 'category', path: '/c/:slug', component: Category },
    { name: 'product', path: '/p/:id/:slug', component: Product }
]

export default function (app, router) {
  router.addRoutes(routes)
  return
}
