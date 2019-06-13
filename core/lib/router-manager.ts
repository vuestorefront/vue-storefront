import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  addRoutes: function (routes: RouteConfig[], routerInstance: VueRouter = router): void {
    const uniqueRoutes = routes.filter(
      (route) => !!this._registeredRoutes.find(
        (registeredRoute) => registeredRoute.name === route.name && registeredRoute.path === route.path
      )
    )
    this._registeredRoutes.push(...uniqueRoutes)
    router.addRoutes(uniqueRoutes)
  },
  findByName: function (name: string): RouteConfig {
    return this._registeredRoutes.find(r => r.name === name)
  },
  findByPath: function (fullPath: string): RouteConfig {
    return this._registeredRoutes.find(r => r.fullPath === fullPath)
  }
}

export { RouterManager }
