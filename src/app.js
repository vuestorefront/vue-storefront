import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { sync } from 'vuex-router-sync'

import { registerTheme } from './lib/themes'
import { registerModules } from './lib/modules'

export function createApp () {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  registerModules(['custom_module'], app, router, store) // TODO: use config or ENV variables
  registerTheme('default', app, router)

  app.$emit('application-after-init', app)

  return { app, router, store }
}
