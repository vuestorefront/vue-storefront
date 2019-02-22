// This function will be executed before entering each route.
// It's important to have 'next()'. It enables navigation to new route.
// See https://router.vuejs.org/guide/advanced/navigation-guards.html#global-guards
import { Route } from 'vue-router'
import store from '@vue-storefront/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { processDynamicRoute, normalizeUrlPath } from '../helpers'

export const UrlDispatchMapper = (to) => {
  return store.dispatch('url/mapUrl', { url: to.fullPath, query: to.query }, { root: true }).then((routeData) => {
    if (routeData) {
      Object.keys(routeData.params).map(key => {
        to.params[key] = routeData.params[key]
      })
      return routeData
    } else {
      return null
    }
  })
}
export function beforeEach(to: Route, from: Route, next) {
  const fullPath = normalizeUrlPath(to.fullPath)
  const hasRouteParams = to.hasOwnProperty('params') && Object.values(to.params).length > 0
  const isPreviouslyDispatchedDynamicRoute = to.matched.length > 0 && to.name.startsWith('urldispatcher')
  if (to.matched.length == 0 || (isPreviouslyDispatchedDynamicRoute && !hasRouteParams)) {
    UrlDispatchMapper(to).then((routeData) => {
      if (routeData) {
        let dynamicRoute = processDynamicRoute(routeData, fullPath, !isPreviouslyDispatchedDynamicRoute)
        if (Array.isArray(dynamicRoute)) dynamicRoute = dynamicRoute[0] // if multistore enabled
        if (dynamicRoute) {
          next(dynamicRoute)
        } else {
          Logger.error('Route not found ' + routeData['name'], 'dispatcher')()
          next('/page-not-found')
        }
      } else {
        Logger.error('No mapping found for ' + fullPath, 'dispatcher')()
        next('/page-not-found')
      }
    }).catch(e => {
      Logger.error(e, 'dispatcher')()
      next('/page-not-found')
    })
  } else {
    next()
  }
}
