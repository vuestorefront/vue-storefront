import { setupMultistoreRoutes } from '@vue-storefront/core/lib/multistore'
import App from './App.vue'
import routes from './router'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { homepageStore } from './store/homepage'
const themeEntry = App

function initTheme (app, router, store, config, ssrContext) {
  store.registerModule('homepage', homepageStore)
  setupMultistoreRoutes(config, router, routes)
  RouterManager.addRoutes(routes, router)
}

export {
  themeEntry,
  initTheme
}
