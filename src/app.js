import Vue from 'vue'
import App from './themes/default/App.vue'
import store from './store'
import router from './router'
import config from './config.json'
import { sync } from 'vuex-router-sync'

import { registerFilters } from './lib/filters'
import { registerTheme } from './lib/themes'
import { registerExtensions } from './lib/extensions'
import VueLazyload from 'vue-lazyload'

import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
Vue.use(VueLazyload, {
  attempt: 2
})

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

  if (config.demomode === true) {
    global.__DEMO_MODE__ = true
  } else {
    global.__DEMO_MODE__ = false
  }

  global.__VERSION__ = '0.2.0'

  return { app, router, store }
}
