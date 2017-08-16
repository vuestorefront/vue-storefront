import Home from './pages/Home.vue'

const routes = [
    { path: '/', component: Home }
]

export default function (app, router) {
  router.addRoutes(routes)
  return
}
