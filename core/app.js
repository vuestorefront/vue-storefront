import union from 'lodash-es/union'
import Vue from 'vue'
import App from 'theme/App'
import store from '@vue-storefront/store'
import router from 'core/router'
import config from 'config'
import { sync } from 'vuex-router-sync'
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
import shippingMethods from 'core/resource/shipping_methods.json'
import { prepareStoreView } from './store/lib/multistore'

import coreModules from './store/modules'
import themeModules from 'theme/store'

if (!global.$VS) global.$VS = {}

global.$VS.version = '1.1'

const storeModules = Object.assign(coreModules, themeModules || {})

for (const moduleName of Object.keys(storeModules)) {
  console.log('Registering Vuex module', moduleName)
  store.registerModule(moduleName, storeModules[moduleName])
}

const storeView = prepareStoreView(null, config, i18n, EventBus) // prepare the default storeView
global.$VS.storeView = storeView
store.state.shipping.methods = shippingMethods

Vue.use(Vuelidate)
Vue.use(VueLazyload, {attempt: 2})
Vue.use(Meta)
Vue.use(VueObserveVisibility)

require('theme/plugins')
const pluginsObject = plugins()
Object.keys(pluginsObject).forEach(key => {
  Vue.use(pluginsObject[key])
})

const mixinsObject = mixins()
Object.keys(mixinsObject).forEach(key => {
  Vue.mixin(mixinsObject[key])
})

const filtersObject = filters()
Object.keys(filtersObject).forEach(key => {
  Vue.filter(key, filtersObject[key])
})

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

  return { app, router, store }
}
