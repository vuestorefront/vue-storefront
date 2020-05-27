import Vue from 'vue'
import union from 'lodash-es/union'
import { createApp } from '@vue-storefront/core/app'
import rootStore from '@vue-storefront/core/store'
import { registerSyncTaskProcessor } from '@vue-storefront/core/lib/sync/task'
import i18n from '@vue-storefront/i18n'
import omit from 'lodash-es/omit'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import { onNetworkStatusChange } from '@vue-storefront/core/modules/offline-order/helpers/onNetworkStatusChange'
import '@vue-storefront/core/service-worker/registration' // register the service worker
import { AsyncDataLoader } from './lib/async-data-loader'
import { Logger } from '@vue-storefront/core/lib/logger'
import globalConfig from 'config'
import { coreHooksExecutors } from './hooks'
import { RouterManager } from './lib/router-manager';
declare var window: any

const invokeClientEntry = async () => {
  const dynamicRuntimeConfig = window.__INITIAL_STATE__.config ? Object.assign(globalConfig, window.__INITIAL_STATE__.config) : globalConfig
  // Get storeCode from server (received either from cache header or env variable)
  let storeCode = window.__INITIAL_STATE__.storeView.storeCode
  const { app, router, store } = await createApp(null, dynamicRuntimeConfig, storeCode)

  if (window.__INITIAL_STATE__) {
    // skip fields that were set by createApp
    const initialState = coreHooksExecutors.beforeHydrated(
      omit(window.__INITIAL_STATE__, ['storeView', 'config', 'version', 'route'])
    )
    store.replaceState(Object.assign({}, store.state, initialState, { config: globalConfig }))
  }

  await store.dispatch('url/registerDynamicRoutes')
  RouterManager.flushRouteQueue()

  function _commonErrorHandler (err, reject) {
    if (err.message.indexOf('query returned empty result') > 0) {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('The product, category or CMS page is not available in Offline mode. Redirecting to Home.'),
        action1: { label: i18n.t('OK') }
      })
      router.push(localizedRoute('/', currentStoreView().storeCode))
    } else {
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t(err.message),
        action1: { label: i18n.t('OK') }
      })
      reject()
    }
  }

  function _ssrHydrateSubcomponents (components, next, to) {
    Promise.all(components.map(SubComponent => {
      if (SubComponent.asyncData) {
        return SubComponent.asyncData({
          store,
          route: to
        })
      } else {
        return Promise.resolve(null)
      }
    })).then(() => {
      AsyncDataLoader.flush({ store, route: to, context: null }).then(next).catch(err => {
        _commonErrorHandler(err, next)
      })
    }).catch(err => {
      _commonErrorHandler(err, next)
    })
  }
  router.onReady(async () => {
    // check if app can be mounted
    const canBeMounted = () => RouterManager.isRouteDispatched() && // route is dispatched
      !(router as any).history.pending && // there is no pending in router history
      !(app as any)._isMounted // it's not mounted before

    if (canBeMounted()) {
      app.$mount('#app')
    }
    router.beforeResolve((to, from, next) => {
      if (!from.name) {
        next()
        if (canBeMounted()) {
          app.$mount('#app')
        }
        return // do not resolve asyncData on server render - already been done
      }
      if (!Vue.prototype.$cacheTags) Vue.prototype.$cacheTags = new Set<string>()
      const matched = router.getMatchedComponents(to)
      if (to) { // this is from url
        if (globalConfig.storeViews.multistore === true) {
          const currentRoute = Object.assign({}, to, { host: window.location.host })
          const storeCode = storeCodeFromRoute(currentRoute)
          const currentStore = currentStoreView()
          if (storeCode !== '' && storeCode !== null) {
            if (storeCode !== currentStore.storeCode) {
              (document as any).location = to.path // full reload
            }
          }
        }
      }
      if (!matched.length || !matched[0]) {
        return next()
      }

      store.dispatch('url/setCurrentRoute', { to, from })

      Promise.all(matched.map((c: any) => { // TODO: update me for mixins support
        const components = c.mixins && globalConfig.ssr.executeMixedinAsyncData ? Array.from(c.mixins) : []
        union(components, [c]).map(SubComponent => {
          if (SubComponent.preAsyncData) {
            SubComponent.preAsyncData({ store, route: to })
          }
        })
        if (c.asyncData) {
          c.asyncData({ store, route: to }).then(result => { // always execute the asyncData() from the top most component first
            Logger.debug('Top-most asyncData executed')()
            _ssrHydrateSubcomponents(components, next, to)
          }).catch(next)
        } else {
          _ssrHydrateSubcomponents(components, next, to)
        }
      }))
    })
  })
  registerSyncTaskProcessor()
  window.addEventListener('online', () => { onNetworkStatusChange(store) })
}

invokeClientEntry()
