// This function will be executed before entering each route.
// It's important to have 'next()'. It enables navigation to new route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
import { Route } from 'vue-router'
import store from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { processDynamicRoute, normalizeUrlPath } from '../helpers'
import { isServer } from '@vue-storefront/core/helpers'
import { storeCodeFromRoute, prepareStoreView, currentStoreView, LocalizedRoute } from '@vue-storefront/core/lib/multistore'
import Vue from 'vue'
import config from 'config'

export const UrlDispatchMapper = async (to) => {
  const routeData = await store.dispatch('url/mapUrl', { url: to.fullPath, query: to.query })
  return Object.assign({}, to, routeData)
}
export function beforeEachGuard (to: Route, from: Route, next) {
  if (isServer) {
    if (config.storeViews.multistore) { // this is called before server-entry.ts router.onReady - so we have to make sure we're in the right store context
      const storeCode = storeCodeFromRoute(to)
      if (storeCode) {
        prepareStoreView(storeCode)
      }
    }
  }

  const fullPath = normalizeUrlPath(to.fullPath)
  const hasRouteParams = to.hasOwnProperty('params') && Object.values(to.params).length > 0
  const isPreviouslyDispatchedDynamicRoute = to.matched.length > 0 && to.name && to.name.startsWith('urldispatcher')
  if (!to.matched.length || to.matched[0].name === 'page-not-found' || (isPreviouslyDispatchedDynamicRoute && !hasRouteParams)) {
    UrlDispatchMapper(to).then((routeData) => {
      if (routeData) {
        let dynamicRoutes: LocalizedRoute[] = processDynamicRoute(routeData, fullPath, !isPreviouslyDispatchedDynamicRoute)
        if (dynamicRoutes && dynamicRoutes.length > 0) {
          next(dynamicRoutes[0])
        } else {
          Logger.error('Route not found ' + routeData['name'], 'dispatcher')()
          next()
        }
      } else {
        Logger.error('No mapping found for ' + fullPath, 'dispatcher')()
        next()
      }
    }).catch(e => {
      Logger.error(e, 'dispatcher')()
      next()
    })
  } else {
    next()
  }
}
