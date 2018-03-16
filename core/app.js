import Vue from 'vue'
import App from 'theme/app'
import store from 'core/store'
import router from 'core/router'
import config from 'config'
import appExtend from 'theme/app-extend'
import { sync } from 'vuex-router-sync'
import _ from 'lodash'

import { registerTheme, plugins, mixins, filters } from 'core/lib/themes'
import { registerExtensions } from 'core/lib/extensions'

import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import i18n from 'core/lib/i18n'

Vue.use(Vuelidate)
Vue.use(VueLazyload, {attempt: 2})
Vue.use(Meta)

const pluginsObject = plugins()
Object.keys(pluginsObject).forEach(function (key) {
  Vue.use(pluginsObject[key])
})

const mixinsObject = mixins()
Object.keys(mixinsObject).forEach(function (key) {
  Vue.mixin(mixinsObject[key])
})

const filtersObject = filters()
Object.keys(filtersObject).forEach(key => {
  Vue.filter(key, filtersObject[key])
})

appExtend(Vue)

export function createApp () {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
  })

  registerExtensions(_.union(config.registeredExtensions, config.requiredExtensions) || [], app, router, store, config) // TODO: use config or ENV variables
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
