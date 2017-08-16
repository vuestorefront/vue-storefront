import Home from './pages/Home.vue'

const routes = [
    { path: '/', component: Home }
]

export function registerTheme (app, router) {
  router.addRoutes(routes)
  return
}
