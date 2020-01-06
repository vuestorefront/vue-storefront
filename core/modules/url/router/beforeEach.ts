// This function will be executed before entering each route.
// It's important to have 'next()'. It enables navigation to new route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
import { Route } from 'vue-router'
import store from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { processDynamicRoute, normalizeUrlPath } from '../helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import { LocalizedRoute } from '@vue-storefront/core/lib/types'
import { RouterManager } from '@vue-storefront/core/lib/router-manager'
import { routerHelper } from '@vue-storefront/core/helpers'

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
    const storeCode = currentStoreView().storeCode
    try {
      const routeData = await UrlDispatchMapper(to)
      if (routeData) {
        let dynamicRoute: LocalizedRoute = processDynamicRoute(routeData, path, !isPreviouslyDispatchedDynamicRoute)
        if (dynamicRoute) {
          next({
            ...dynamicRoute,
            replace: routerHelper.popStateDetected || dynamicRoute.fullPath === from.fullPath
          })
        } else {
          Logger.error('Route not found ' + routeData['name'], 'dispatcher')()
          next()
        }
      } else {
        Logger.error('No mapping found for ' + path, 'dispatcher')()
        next()
      }
    } catch (e) {
      Logger.error(e, 'dispatcher')()
      next()
    } finally {
      RouterManager.unlockRoute()
    }
  } else {
    next()
    RouterManager.unlockRoute()
    routerHelper.popStateDetected = false
  }

  routerHelper.popStateDetected = false
}
