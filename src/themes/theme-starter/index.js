import Home from './pages/Home.vue'

const routes = [
  { path: '/', component: Home }
]

export default function (app, router, store) {
  router.addRoutes(routes)
  return
}
