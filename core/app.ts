import { Store } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import Vue from 'vue'
import { isServer, once } from '@vue-storefront/core/helpers'
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import i18n from '@vue-storefront/i18n'
import VueRouter from 'vue-router'
import Vuelidate from 'vuelidate'
import Meta from 'vue-meta'
import { sync } from 'vuex-router-sync'
// TODO simplify by removing global mixins, plugins and filters - it can be done in normal 'vue' way
import { registerTheme } from '@vue-storefront/core/lib/themes'
import { themeEntry } from 'theme/index.js'
import { registerModules } from '@vue-storefront/core/lib/module'
import { prepareStoreView, currentStoreView } from '@vue-storefront/core/lib/multistore'
import * as coreMixins from '@vue-storefront/core/mixins'
import * as coreFilters from '@vue-storefront/core/filters'

import store from '@vue-storefront/core/store'
import { enabledModules } from './modules-entry'
import globalConfig from 'config'
import { injectReferences } from '@vue-storefront/core/lib/modules'
import { coreHooksExecutors } from '@vue-storefront/core/hooks'
import { registerClientModules } from 'src/modules/client'
import initialStateFactory from '@vue-storefront/core/helpers/initialStateFactory'
import { createRouter, createRouterProxy } from '@vue-storefront/core/helpers/router'
import { extendHeadFactory, HeadManager } from './helpers/extended-head.factory'
import {
  createApplicationServiceProviders,
  createI18nAdapter,
  createRouteView
} from './application-services'
import {
  AdditionalContentRegistry,
  additionalContentInjectionKey
} from './additional-content'
import {
  createRequestServices,
  requestServicesInjectionKey
} from './request-services'

const stateFactory = initialStateFactory(store.state)

let router: VueRouter = null
let routerProxy: VueRouter = null

once('__VUE_EXTEND_RR__', () => {
  Vue.use(VueRouter)
})

const createApp = async (ssrContext, config, storeCode = null): Promise<{
  app: Vue,
  router: VueRouter,
  store: Store<RootState>,
  initialState: RootState,
  head: HeadManager
}> => {
  router = createRouter()
  routerProxy = createRouterProxy(router)
  // sync router with vuex 'router' store
  sync(store, routerProxy)
  // TODO: Don't mutate the state directly, use mutation instead
  store.state.version = process.env.__APPVERSION__
  store.state.config = config // @deprecated
  store.state.__DEMO_MODE__ = (config.demomode === true)
  if (ssrContext) {
    Vue.prototype.$cacheTags = ssrContext.output.cacheTags
  }
  if (!store.state.config) store.state.config = globalConfig //  @deprecated - we should avoid the `config`
  const storeView = await prepareStoreView(storeCode) // prepare the default storeView
  store.state.storeView = storeView
  const routeView = createRouteView(routerProxy)
  const additionalContent = new AdditionalContentRegistry()
  const requestServices = createRequestServices(ssrContext)

  // @deprecated from 2.0
  once('__VUE_EXTEND__', () => {
    Vue.use(Vuelidate)
    Vue.use(Meta, {
      ssrAppId: 1
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
    provide: {
      ...createApplicationServiceProviders({
        store,
        router: routerProxy,
        route: routeView,
        i18n: createI18nAdapter(i18n)
      }),
      [additionalContentInjectionKey as symbol]: additionalContent,
      [requestServicesInjectionKey as symbol]: requestServices
    },
    render: h => h(themeEntry)
  }

  const app = new Vue(vueOptions)
  const head = extendHeadFactory();

  const appContext = {
    isServer,
    ssrContext
  }

  injectReferences(app, store, routerProxy, globalConfig, {
    head,
    additionalContent,
    request: requestServices
  })
  registerClientModules()
  registerModules(enabledModules, appContext)
  registerTheme(globalConfig.theme, app, routerProxy, store, globalConfig, ssrContext)

  coreHooksExecutors.afterAppInit()
  // @deprecated from 2.0
  EventBus.$emit('application-after-init', app)

  return {
    app,
    router: routerProxy,
    store,
    initialState: stateFactory.createInitialState(store.state),
    head
  }
}

export { routerProxy as router, createApp, router as baseRouter }
