import userRoutes from 'theme/router'
import { router } from '@vue-storefront/core/app'
import * as entities from '@vue-storefront/store/lib/entities'

export function addDynamicRoute(routeData, fullPath) {
  const userRoute = userRoutes.find(r => r.name === routeData.name)
  if (userRoute) {
    const dynamicRoute = Object.assign({}, userRoute, routeData, { path: fullPath, name: `${routeData.name}-${entities.uniqueEntityId(null)}` })
    router.addRoutes([dynamicRoute])
    return dynamicRoute
  } else {
    return null
  }
}