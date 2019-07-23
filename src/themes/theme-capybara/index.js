import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

const themeEntry = App

function initTheme (app, router, store, config, ssrContext) {
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}
