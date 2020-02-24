import union from 'lodash-es/union'
import { createApp } from '@vue-storefront/core/app'
import { registerSyncTaskProcessor } from '@vue-storefront/core/lib/sync/task'
import i18n from '@vue-storefront/i18n'
import storeCodeFromRoute from '@vue-storefront/core/lib/storeCodeFromRoute'
import { currentStoreView, localizedRoute } from '@vue-storefront/core/lib/multistore'
import { onNetworkStatusChange } from '@vue-storefront/core/modules/offline-order/helpers/onNetworkStatusChange'
import '@vue-storefront/core/service-worker/registration' // register the service worker
import { AsyncDataLoader } from './lib/async-data-loader'
import { Logger } from '@vue-storefront/core/lib/logger'
import globalConfig from 'config'
import { RouterManager } from './lib/router-manager';
import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
declare var window: any

const createCommonErrorHandler = ({ store, router }) => (err, next) => {
  if (err.message.indexOf('query returned empty result') > 0) {
    store.dispatch('notification/spawnNotification', {
      type: 'error',
      message: i18n.t('The product, category or CMS page is not available in Offline mode. Redirecting to Home.'),
      action1: { label: i18n.t('OK') }
    })
    router.push(localizedRoute('/', currentStoreView().storeCode))
  } else {
    store.dispatch('notification/spawnNotification', {
      type: 'error',
      message: i18n.t(err.message),
      action1: { label: i18n.t('OK') }
    })
    next()
  }
}

const createSsrHydrateSubcomponents = ({ store }) => async (components, to, asyncMethodName) => {
  await Promise.all(components.map(subComponent => {
    if (subComponent[asyncMethodName]) {
      return subComponent[asyncMethodName]({
        store,
        route: to
      })
    } else {
      return Promise.resolve(null)
    }
  }))
}

const invokeClientEntry = async () => {
  const { app, router, store } = await createApp(null, globalConfig, null)
  app.$mount('#app');

  await store.dispatch('url/registerDynamicRoutes')
  RouterManager.flushRouteQueue()

  const ssrHydrateSubcomponents = createSsrHydrateSubcomponents({ store })
  const commonErrorHandler = createCommonErrorHandler({ store, router })

  router.beforeResolve(async (to, from, next) => {
    const matched = router.getMatchedComponents(to)
    if (to) { // this is from url
      if (globalConfig.storeViews.multistore === true) {
        const currentRoute = Object.assign({}, to, {host: window.location.host})
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
    const asyncDataPromises = matched.map(async (c: any) => { // TODO: update me for mixins support
      const components = c.mixins && globalConfig.ssr.executeMixedinAsyncData ? Array.from(c.mixins) : []
      if (c.asyncData) {
        await c.asyncData({ store, route: to })
        Logger.debug('Top-most asyncData executed')()
      }
      await ssrHydrateSubcomponents(components, to, 'asyncData')
      Logger.debug('All asyncData executed')()
    })
    try {
      await Promise.all(asyncDataPromises)
      await AsyncDataLoader.flush({ store, route: to, context: null })
      Logger.debug('AsyncDataLoader executed')()
      next()
    } catch (err) {
      commonErrorHandler(err, next)
    }
  })
  registerSyncTaskProcessor()
  window.addEventListener('online', () => { onNetworkStatusChange(store) })
}

invokeClientEntry()
