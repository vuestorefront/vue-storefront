import Home from './pages/Home.vue'
import Category from './pages/Category.vue'

const routes = [
    { path: '/', component: Home },
    { name: 'category', path: '/c/:slug', component: Category }
]

export default function (app, router) {
  router.addRoutes(routes)
  return
}
