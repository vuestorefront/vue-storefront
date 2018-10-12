import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'
import { union } from 'lodash-es'
import buildTimeConfig from 'config'
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

// core modules registration that'll be completely moved to theme TODO: move to accesibel entry point when ready
import { registerModules } from '@vue-storefront/core/modules'
import { mailchimp } from '@vue-storefront/core/modules/mailchimp'

import { takeOverConsole } from '@vue-storefront/core/helpers/log'

if (buildTimeConfig.console.verbosityLevel !== 'display-everything') {
  takeOverConsole(buildTimeConfig.console.verbosityLevel)
}


export function createApp (ssrContext, config): { app: Vue, router: any, store: any } {
  sync(store, router)
  store.state.version = '1.4.0'
  store.state.config = config
  store.state.__DEMO_MODE__ = (config.demomode === true) ? true : false
  if(ssrContext) Vue.prototype.$ssrRequestContext = ssrContext

  if (!store.state.config) store.state.config = buildTimeConfig // if provided from SSR, don't replace it
  const storeModules = Object.assign(coreModules, themeModules || {})
  const VSModules = [mailchimp]

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
    const httpLink = new HttpLink({
      uri: store.state.config.graphql.host.indexOf('://') >= 0 ? store.state.config.graphql.host : (store.state.config.server.protocol + '://' + store.state.config.graphql.host + ':' + store.state.config.graphql.port + '/graphql')
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
  const app = new Vue({
    router,
    store,
    i18n,
    provide: apolloProvider,
    render: h => h(App)
  })
  registerExtensions(
    union(extensionEntryPoints, themeExtensionEntryPoints),
    app,
    router,
    store,
    store.state.config,
    ssrContext
  )
  registerTheme(buildTimeConfig.theme, app, router, store, store.state.config, ssrContext)
  registerModules(VSModules)
  app.$emit('application-after-init', app)
  return { app, router, store }
}
