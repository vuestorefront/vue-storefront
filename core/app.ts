import { Store } from 'vuex'
import RootState from '@vue-storefront/store/types/RootState'
import Vue from 'vue'
import buildTimeConfig from 'config'
import { isServer } from '@vue-storefront/core/helpers'

// Plugins
import i18n from '@vue-storefront/i18n'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'

// Apollo GraphQL client
import { getApolloProvider } from './scripts/resolvers/resolveGraphQL'

// TODO simplify by removing global mixins, plugins and filters - it can be done in normal 'vue' way
import { registerTheme } from '@vue-storefront/core/lib/themes'
import { registerModules } from '@vue-storefront/core/lib/module'
import { prepareStoreView } from '@vue-storefront/store/lib/multistore'
import { plugins, mixins, filters } from '@vue-storefront/core/compatibility/lib/themes'
import { once } from '@vue-storefront/core/helpers'
import { takeOverConsole } from '@vue-storefront/core/helpers/log'

// Entrys
import App from 'theme/App.vue'
import store from '@vue-storefront/store'

import { enabledModules } from './modules-entry'

// Will be depreciated in 1.8
import { registerExtensions } from '@vue-storefront/core/compatibility/lib/extensions'
import { registerExtensions as extensions } from 'src/extensions'

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

let router: VueRouter = null

Vue.use(VueRouter)

// Will be depreciated in 1.7. Now we are using Logger instead of logs
if (buildTimeConfig.console.verbosityLevel !== 'display-everything' && process.env.NODE_ENV === 'production') {
  once('__TAKE_OVER_CONSOLE__', () => {
    takeOverConsole(buildTimeConfig.console.verbosityLevel)
  })
}

const createApp  = async (ssrContext, config): Promise<{app: Vue, router: VueRouter, store: Store<RootState>}> => {
  router = createRouter()
  // sync router with vuex 'router' store
  sync(store, router)
  // TODO: Don't mutate the state directly, use mutation instead
  store.state.version = '1.7.0'
  store.state.config = config
  store.state.__DEMO_MODE__ = (config.demomode === true) ? true : false
  if(ssrContext) Vue.prototype.$ssrRequestContext = ssrContext
  if (!store.state.config) store.state.config = buildTimeConfig // if provided from SSR, don't replace it

  const storeView = prepareStoreView(null) // prepare the default storeView
  store.state.storeView = storeView
  // store.state.shipping.methods = shippingMethods

  Vue.use(Vuelidate)
  Vue.use(VueLazyload, {attempt: 2, preLoad: 1.5})
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

  let vueOptions = {
    router,
    store,
    i18n,
    render: h => h(App)
  }

  const apolloProvider = await getApolloProvider()
  if (apolloProvider) {
    Object.assign(vueOptions, {provider: apolloProvider})
  }

  const app = new Vue(vueOptions)

  const appContext = {
    isServer,
    ssrContext
  }

  registerModules(enabledModules, appContext)
  registerExtensions(extensions, app, router, store, config, ssrContext)
  registerTheme(buildTimeConfig.theme, app, router, store, store.state.config, ssrContext)

  app.$emit('application-after-init', app)

  return { app, router, store }
}

export { router, createApp }
