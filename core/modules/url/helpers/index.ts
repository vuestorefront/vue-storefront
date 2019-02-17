import userRoutes from 'theme/router'
import { router } from '@vue-storefront/core/app'
import * as entities from '@vue-storefront/store/lib/entities'

export function processDynamicRoute(routeData, fullPath, addToRoutes = true) {
  const userRoute = userRoutes.find(r => r.name === routeData.name)
  if (userRoute) {
    const dynamicRoute = Object.assign({}, userRoute, routeData, { path: '/' + fullPath, name: `urldispatcher-${fullPath}` })
    if (addToRoutes) router.addRoutes([dynamicRoute])
    return dynamicRoute
  } else {
    return null
  }
}

export function findRouteByPath(fullPath) {
  return userRoutes.find(r => r.fullPath === fullPath)
}

export function normalizeUrlPath(url) {
  if (url && url.length > 0) {
    if (url[0] === '/') url = url.slice(1)
    const queryPos = url.indexOf('?')
    if (queryPos > 0) url = url.slice(0, queryPos)
  }
  return url  
}