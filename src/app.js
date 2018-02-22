import Vue from 'vue'
import App from 'theme/app'
import store from 'core/store'
import router from 'core/router'
import config from 'config'

import { sync } from 'vuex-router-sync'

import { registerTheme, plugins } from './lib/themes'
import { registerExtensions } from './lib/extensions'
import thumbnailMixin from './mixins/thumbnail'
import * as filters from './filters'

import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import i18n from 'lib/i18n'

const pluginsObject = plugins()
Object.keys(pluginsObject).forEach(function (key) {
  Vue.use(pluginsObject[key])
})

Vue.use(Vuelidate)
Vue.use(VueLazyload, {
  attempt: 2
})

// Mixin for handling thumbnail
Vue.mixin(thumbnailMixin)

// Register global filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

export function createApp () {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })

  registerExtensions(config.registeredExtensions || [], app, router, store, config) // TODO: use config or ENV variables
  registerTheme(config.theme, app, router, store)

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
