
import Vue from 'vue'
import App from './themes/catalog/App.vue'
import store from './store'
import router from './router'
import { EventBusPlugin as EventBus } from './event-bus'
import config from './config.json'
import { sync } from 'vuex-router-sync'
import { registerFilters } from './lib/filters'
import { registerTheme } from './lib/themes'
import { registerExtensions } from './lib/extensions'

import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'

Vue.use(EventBus)
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

  registerExtensions(config.registeredExtensions || [], app, router, store, config) // TODO: use config or ENV variables
  registerTheme('catalog', app, router, store)
  registerFilters(app, config)

  app.$emit('application-after-init', app)

  if (config.demomode === true) {
    global.__DEMO_MODE__ = true
  } else {
    global.__DEMO_MODE__ = false
  }

  global.__VERSION__ = '0.2.0'
  global.__CONFIG__ = config
  global.__TAX_COUNTRY__ = config.tax.defaultCountry || 'PL'
  global.__TAX_REGION__ = config.tax.defaultRegion || ''
  global.__I18N_COUNTRY__ = config.i18n.defaultCountry || 'US'
  global.__I18N_LANG__ = config.i18n.defaultLanguage || 'EN'

  return { app, router, store }
}
