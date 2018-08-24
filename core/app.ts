import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'
import { union } from 'lodash-es'
import config from 'config'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'

import router from '@vue-storefront/core/router'
import EventBus from '@vue-storefront/core/plugins/event-bus'
import { registerTheme, plugins, mixins, filters } from '@vue-storefront/core/lib/themes'
import registerExtensions from '@vue-storefront/core/lib/extensions'
import i18n from '@vue-storefront/core/lib/i18n'

import store from '@vue-storefront/store'
import coreModules from '@vue-storefront/store/modules'
import { prepareStoreView } from '@vue-storefront/store/lib/multistore'

import App from 'theme/App.vue'
import themeModules from 'theme/store'
import themeExtensionEntryPoints from 'theme/extensions'
import extensionEntryPoints from 'src/extensions'

const shippingMethods = require('@vue-storefront/core/resource/shipping_methods.json')

declare var global: any

if (!global.$VS) global.$VS = {}

store.state.version = '1.3'

const storeModules = Object.assign(coreModules, themeModules || {})

for (const moduleName of Object.keys(storeModules)) {
  console.log('Registering Vuex module', moduleName)
  store.registerModule(moduleName, storeModules[moduleName])
}

const storeView = prepareStoreView(null, config, i18n, EventBus) // prepare the default storeView
store.state.storeView = storeView
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

export function createApp (): { app: Vue, router: any, store: any } {
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
