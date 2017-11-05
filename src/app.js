import Vue from 'vue'
import App from './themes/default/App.vue'
import store from './store'
import router from './router'
import config from './config.json'
import { sync } from 'vuex-router-sync'

import { registerFilters } from './lib/filters'
import { registerTheme } from './lib/themes'
import { registerExtensions } from './lib/extensions'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

export function createApp () {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    render: h => h(App)
  })

  registerExtensions(['custom_extension'], app, router, store) // TODO: use config or ENV variables
  registerTheme('default', app, router, store)
  registerFilters(app, config)

  app.$emit('application-after-init', app)

  return { app, router, store }
}
