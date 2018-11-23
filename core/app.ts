import Vue from 'vue'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'
import union from 'lodash-es/union'
import buildTimeConfig from 'config'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'

// TODO simplify by removing global mixins, plugins and filters - it can be done in normal 'vue' way
import { registerTheme } from '@vue-storefront/core/lib/themes'
import { plugins, mixins, filters } from '@vue-storefront/core/compatibility/lib/themes'
import i18n from '@vue-storefront/i18n'
import VueRouter from 'vue-router'

import store from '@vue-storefront/store'
import coreModules from '@vue-storefront/store/modules'
import { prepareStoreView } from '@vue-storefront/store/lib/multistore'

import App from 'theme/App.vue'

// TODO depreciated and moved to modules functionality. Will be removed in 1.7
import registerExtensions from '@vue-storefront/core/compatibility/lib/extensions'
import themeModules from 'theme/store'
import themeExtensionEntryPoints from 'theme/extensions'
import extensionEntryPoints from 'src/extensions'

import { once } from './helpers'

// Declare Apollo graphql client
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// core modules registration that'll be completely moved to theme TODO: move to accesibel entry point when ready
import { enabledModules } from './modules-entry'
import { takeOverConsole } from '@vue-storefront/core/helpers/log'

const isProd = process.env.NODE_ENV === 'production'

if (buildTimeConfig.console.verbosityLevel !== 'display-everything' && isProd) {
  once('__TAKE_OVER_CONSOLE__', () => {
    takeOverConsole(buildTimeConfig.console.verbosityLevel)
  })
}

function createRouter () {
  return new VueRouter({
    mode: 'history',
    base: __dirname,
    scrollBehavior: (to, from, savedPosition) => {
      if (to.hash) {
        return {
          selector: to.hash
        }
      }
      if (savedPosition) {
        return savedPosition
      } else {
        return {x: 0, y: 0}
      }
    }
  })
}

// vs router instance
export let router = null

Vue.use(VueRouter)

export function createApp (ssrContext, config): { app: Vue, router: any, store: any } {
  router = createRouter()
  // sync router with vuex 'router' store
  sync(store, router)
  store.state.version = '1.5.0'
  store.state.config = config
  store.state.__DEMO_MODE__ = (config.demomode === true) ? true : false
  if(ssrContext) Vue.prototype.$ssrRequestContext = ssrContext
  Vue.prototype.$coreRouter = router
  if (!store.state.config) store.state.config = buildTimeConfig // if provided from SSR, don't replace it

  // depreciated
  const storeModules = Object.assign(coreModules, themeModules || {})

  // depreciated
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

  // to depreciate in near future
  once('__VUE_EXTEND__', () => {
    console.debug('Registering Vue plugins')
    require('theme/plugins')
    const pluginsObject = plugins()
    Object.keys(pluginsObject).forEach(key => {
      Vue.use(pluginsObject[key])
    })

    console.debug('Registering Vue mixins')
    const mixinsObject = mixins()
    Object.keys(mixinsObject).forEach(key => {
      Vue.mixin(mixinsObject[key])
    })
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

  // depreciated
  registerExtensions(
    union(extensionEntryPoints, themeExtensionEntryPoints),
    app,
    router,
    store,
    store.state.config,
    ssrContext
  )
  // 
  enabledModules.forEach(m => m.register(store, router))
  registerTheme(buildTimeConfig.theme, app, router, store, store.state.config, ssrContext)
  app.$emit('application-after-init', app)
  return { app, router, store }
}
