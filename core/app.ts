import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'
import { union } from 'lodash-es'
import config from 'config'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'

import router from '@vue-storefront/core/router'
import { registerTheme, plugins, mixins, filters } from '@vue-storefront/core/lib/themes'
import registerExtensions from '@vue-storefront/core/lib/extensions'
import i18n from '@vue-storefront/i18n'

import store from '@vue-storefront/store'
import coreModules from '@vue-storefront/store/modules'
import { prepareStoreView } from '@vue-storefront/store/lib/multistore'

import App from 'theme/App.vue'
import themeModules from 'theme/store'
import themeExtensionEntryPoints from 'theme/extensions'
import extensionEntryPoints from 'src/extensions'

// Declare Apollo graphql client
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import { takeOverConsole } from '@vue-storefront/core/helpers/log'
if (config.console.verbosityLevel !== 'display-everything') {
  takeOverConsole(config.console.verbosityLevel)
}

const httpLink = new HttpLink({
    uri: config.server.protocol + '://' + config.graphql.host + ':' + config.graphql.port + '/graphql'
})

const apolloClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
    connectToDevTools: true
})

let loading = 0

const apolloProvider = new VueApollo({
    clients: {
        a: apolloClient
    },
    defaultClient: apolloClient,
    defaultOptions: {
        // $loadingKey: 'loading',
    },
    watchLoading (state, mod) {
        loading += mod
        console.log('Global loading', loading, mod)
    },
    errorHandler (error) {
        console.log('Global error handler')
        console.error(error)
    }
})

Vue.use(VueApollo)
// End declare Apollo graphql client

store.state.version = '1.3.0'
store.state.__DEMO_MODE__ = (config.demomode === true) ? true : false
store.state.config = config

const storeModules = Object.assign(coreModules, themeModules || {})

for (const moduleName of Object.keys(storeModules)) {
  console.debug('Registering Vuex module', moduleName)
  store.registerModule(moduleName, storeModules[moduleName])
}

const storeView = prepareStoreView(null) // prepare the default storeView
store.state.storeView = storeView
// store.state.shipping.methods = shippingMethods

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

export function createApp (serverContext = null): { app: Vue, router: any, store: any } {
  sync(store, router)
  const app = new Vue({
    router,
    store,
    i18n,
    provide: apolloProvider.provide(),
    render: h => h(App)
  })

  registerExtensions(
    union(extensionEntryPoints, themeExtensionEntryPoints),
    app,
    router,
    store,
    config,
    serverContext
  )

  registerTheme(config.theme, app, router, store)

  app.$emit('application-after-init', app)

  return { app, router, store }
}
