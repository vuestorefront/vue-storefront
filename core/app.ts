import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Store } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import Vue from 'vue'
import buildTimeConfig from 'config'

// Plugins
import i18n from '@vue-storefront/i18n'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'

// Apollo GraphQL client
import ApolloClient from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

// TODO simplify by removing global mixins, plugins and filters - it can be done in normal 'vue' way
import { registerTheme } from '@vue-storefront/core/lib/themes'
import { prepareStoreView } from '@vue-storefront/store/lib/multistore'
import { plugins, mixins, filters } from '@vue-storefront/core/compatibility/lib/themes'
import { once } from '@vue-storefront/core/helpers'
import { takeOverConsole } from '@vue-storefront/core/helpers/log'
import { Logger } from '@vue-storefront/core/lib/logger'

// Entrys
import App from 'theme/App.vue'
import store from '@vue-storefront/store'
// Will be depreciated in 1.7
import themeModules from 'theme/store'

import { enabledModules } from './modules-entry'

// Will be depreciated in 1.7
import { registerExtensions } from '@vue-storefront/core/compatibility/lib/extensions'
import { registerExtensions as extensions } from 'src/extensions'
import rootStore from '@vue-storefront/store';


function createRouter (): VueRouter {
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

function registerModules (modules: VueStorefrontModule[], store: Store<RootState>, router: VueRouter, context): void {
  let registeredModules = []
  modules.forEach(m => registeredModules.push(m.register(store, router)))
  Logger.info('VS Modules registration finished.', 'module', {
      succesfulyRegistered: registeredModules.length + ' / ' + modules.length,
      registrationOrder: registeredModules
    }
  )()
}

let router: VueRouter = null

Vue.use(VueRouter)

// Will be depreciated in 1.7. Now we are using Logger instead of logs
if (buildTimeConfig.console.verbosityLevel !== 'display-everything' && process.env.NODE_ENV === 'production') {
  once('__TAKE_OVER_CONSOLE__', () => {
    takeOverConsole(buildTimeConfig.console.verbosityLevel)
  })
}

function createApp (ssrContext, config): { app: Vue, router: VueRouter, store: Store<RootState> } {
  router = createRouter()
  // sync router with vuex 'router' store
  sync(store, router)
  // TODO: Don't mutate the state directly, use mutation instead
  store.state.version = '1.6.0'
  store.state.config = config
  store.state.__DEMO_MODE__ = (config.demomode === true) ? true : false
  if(ssrContext) Vue.prototype.$ssrRequestContext = ssrContext
  if (!store.state.config) store.state.config = buildTimeConfig // if provided from SSR, don't replace it

  // depreciated, will be removed in 1.7
  const storeModules = themeModules || {} 

  // depreciated, will be removed in 1.7
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
  
  const app = new Vue({
    router,
    store,
    i18n,
    provide: apolloProvider,
    render: h => h(App)
  })

  const appContext = {
    isServer: typeof window !== 'undefined',
    ssrContext
  }

  registerModules(enabledModules, store, router, appContext)
  registerExtensions(extensions, app, router, store, config, ssrContext)
  registerTheme(buildTimeConfig.theme, app, router, store, store.state.config, ssrContext)

  app.$emit('application-after-init', app)
  
  return { app, router, store }
}

export { router, createApp }