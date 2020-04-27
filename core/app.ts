import { Store } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import Vue from 'vue'
import { isServer } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import i18n from '@vue-storefront/i18n'
import VueRouter from 'vue-router'
import VueLazyload from 'vue-lazyload'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
import VueObserveVisibility from 'vue-observe-visibility'
import { getApolloProvider } from './scripts/resolvers/resolveGraphQL'
// TODO simplify by removing global mixins, plugins and filters - it can be done in normal 'vue' way
import { registerTheme } from '@vue-storefront/core/lib/themes'
import { themeEntry } from 'theme/index.js'
import { registerModules } from '@vue-storefront/core/lib/module'
import { prepareStoreView, currentStoreView } from '@vue-storefront/core/lib/multistore'
import * as coreMixins from '@vue-storefront/core/mixins'
import * as coreFilters from '@vue-storefront/core/filters'
import * as corePlugins from '@vue-storefront/core/compatibility/plugins'
import { once } from '@vue-storefront/core/helpers'
import store from '@vue-storefront/core/store'
import { enabledModules } from './modules-entry'
import globalConfig from 'config'
import { injectReferences } from '@vue-storefront/core/lib/modules'
import { coreHooksExecutors } from '@vue-storefront/core/hooks'
import { registerClientModules } from 'src/modules/client'
import initialStateFactory from '@vue-storefront/core/helpers/initialStateFactory'
import { createRouter, createRouterProxy } from '@vue-storefront/core/helpers/router'
import { checkForIntlPolyfill } from '@vue-storefront/i18n/intl'

const stateFactory = initialStateFactory(store.state)

let router: VueRouter = null
let routerProxy: VueRouter = null

once('__VUE_EXTEND_RR__', () => {
  Vue.use(VueRouter)
})

const createApp = async (ssrContext, config, storeCode = null): Promise<{app: Vue, router: VueRouter, store: Store<RootState>, initialState: RootState}> => {
  router = createRouter()
  routerProxy = createRouterProxy(router)
  // sync router with vuex 'router' store
  sync(store, routerProxy)
  // TODO: Don't mutate the state directly, use mutation instead
  store.state.version = process.env.APPVERSION
  store.state.config = config // @deprecated
  store.state.__DEMO_MODE__ = (config.demomode === true)
  if (ssrContext) {
    // @deprecated - we shouldn't share server context between requests
    Vue.prototype.$ssrRequestContext = {
      output: {
        cacheTags: ssrContext.output.cacheTags
      },
      userAgent: ssrContext.server.request.headers['user-agent']
    }

    Vue.prototype.$cacheTags = ssrContext.output.cacheTags
  }
  if (!store.state.config) store.state.config = globalConfig //  @deprecated - we should avoid the `config`
  const storeView = await prepareStoreView(storeCode) // prepare the default storeView
  store.state.storeView = storeView

  // @deprecated from 2.0
  once('__VUE_EXTEND__', () => {
    Vue.use(Vuelidate)
    Vue.use(VueLazyload, { attempt: 2, preLoad: 1.5 })
    Vue.use(Meta, {
      ssrAppId: 1
    })
    Vue.use(VueObserveVisibility)

    Object.keys(corePlugins).forEach(key => {
      Vue.use(corePlugins[key])
    })

    Object.keys(coreMixins).forEach(key => {
      Vue.mixin(coreMixins[key])
    })

    Object.keys(coreFilters).forEach(key => {
      Vue.filter(key, coreFilters[key])
    })
  })

  let vueOptions = {
    router: routerProxy,
    store,
    i18n,
    render: h => h(themeEntry)
  }

  const apolloProvider = await getApolloProvider()
  if (apolloProvider) Object.assign(vueOptions, { provider: apolloProvider })

  const app = new Vue(vueOptions)

  const appContext = {
    isServer,
    ssrContext
  }

  injectReferences(app, store, routerProxy, globalConfig)
  registerClientModules()
  registerModules(enabledModules, appContext)
  registerTheme(globalConfig.theme, app, routerProxy, store, globalConfig, ssrContext)

  await checkForIntlPolyfill(storeView)

  coreHooksExecutors.afterAppInit()
  // @deprecated from 2.0
  EventBus.$emit('application-after-init', app)

  return { app, router: routerProxy, store, initialState: stateFactory.createInitialState(store.state) }
}

export { routerProxy as router, createApp, router as baseRouter }
