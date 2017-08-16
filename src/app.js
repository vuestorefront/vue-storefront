import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import { registerTheme } from './themes/default'
import { registerModules } from './lib/modules'

export function createApp () {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  registerModules(['custom_module'], app, router, store)
  registerTheme(app, router)

  return { app, router, store }
}
