import union from 'lodash-es/union'
import Vue from 'vue'
import App from 'theme/App'
import store from '@vue-storefront/store'
import router from 'core/router'
import config from 'config'
import appExtend from 'theme/app-extend'
import { sync } from 'vuex-router-sync'
import themeModules from 'theme/store'
import EventBus from 'core/plugins/event-bus'

import { registerTheme, plugins, mixins, filters } from 'core/lib/themes'
import registerExtensions from 'core/lib/extensions'
import extensionEntryPoints from 'src/extensions'
import themeExtensionEntryPoints from 'theme/extensions'
import VueObserveVisibility from 'vue-observe-visibility'

import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import i18n from 'core/lib/i18n'
import VueOffline from 'vue-offline'
import shippingMethods from 'core/resource/shipping_methods.json'

if (!global.$VS) global.$VS = {}

if (themeModules) {
  for (const moduleName of Object.keys(themeModules)) {
    console.log('Registering custom, theme Vuex store as module', moduleName)
    store.registerModule(moduleName, themeModules[moduleName])
  }
}

store.init(config, i18n, EventBus)

Vue.use(Vuelidate)
Vue.use(VueLazyload, {attempt: 2})
Vue.use(Meta)
Vue.use(VueOffline)
Vue.use(VueObserveVisibility)

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

  registerExtensions(
    union(extensionEntryPoints, themeExtensionEntryPoints),
    app,
    router,
    store,
    config
  )

  registerTheme(config.theme, app, router, store)

  app.$emit('application-after-init', app)

  if (config.demomode === true) {
    global.$VS.__DEMO_MODE__ = true
  } else {
    global.$VS.__DEMO_MODE__ = false
  }

  global.$VS.__VERSION__ = '1.0.0-rc2s.0'
  global.$VS.__CONFIG__ = config
  global.$VS.__TAX_COUNTRY__ = config.tax.defaultCountry || 'PL'
  global.$VS.__TAX_REGION__ = config.tax.defaultRegion || ''
  global.$VS.__I18N_COUNTRY__ = config.i18n.defaultCountry || 'US'
  global.$VS.__I18N_LANG__ = config.i18n.defaultLanguage || 'EN'

  store.state.shipping.methods = shippingMethods

  return { app, router, store }
}
