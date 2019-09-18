// This function will be executed before entering each route.
// It's important to have 'next()'. It enables navigation to new route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
import { Route } from 'vue-router'
import store from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { processDynamicRoute, normalizeUrlPath } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { currentStoreView, LocalizedRoute, localizedRoute, storeCodeFromRoute } from '@vue-storefront/core/lib/multistore'
import config from 'config'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'

export const UrlDispatchMapper = async (to) => {
  const routeData = await store.dispatch('url/mapUrl', { url: to.path, query: to.query })
  return Object.assign({}, to, routeData)
}

export async function beforeEachGuard (to: Route, from: Route, next) {
  if (RouterManager.isRouteProcessing()) {
    await RouterManager.getRouteLockPromise()
    next()
    return
  }
  RouterManager.lockRoute()

  const path = normalizeUrlPath(to.path)
  const hasRouteParams = to.hasOwnProperty('params') && Object.values(to.params).length > 0
  const isPreviouslyDispatchedDynamicRoute = to.matched.length > 0 && to.name && to.name.startsWith('urldispatcher')
  if (!to.matched.length || to.matched[0].name.endsWith('page-not-found') || (isPreviouslyDispatchedDynamicRoute && !hasRouteParams)) {
    try {
      const routeData = await UrlDispatchMapper(to)
      if (routeData) {
        // TODO - need route name prefix? add here
        let dynamicRoute: LocalizedRoute = processDynamicRoute(routeData, path, !isPreviouslyDispatchedDynamicRoute)
        if (dynamicRoute) {
          next(dynamicRoute)
        } else {
          Logger.error('Route not found ' + routeData['name'], 'dispatcher')()
          next(localizedRoute('/page-not-found', currentStoreView().storeCode))
        }
      } else {
        Logger.error('No mapping found for ' + path, 'dispatcher')()
        next(localizedRoute('/page-not-found', currentStoreView().storeCode))
      }
    } catch (e) {
      Logger.error(e, 'dispatcher')()
      next(localizedRoute('/page-not-found', currentStoreView().storeCode))
    } finally {
      RouterManager.unlockRoute()
    }
  } else {
    next()
    RouterManager.unlockRoute()
  }
}
