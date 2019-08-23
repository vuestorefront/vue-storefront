import { Logger } from '@vue-storefront/core/lib/logger'
import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig, Route } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  _lockedRoutes: new Map(),
  addRoutes : function (routes: RouteConfig[], routerInstance: VueRouter = router): void {
    this._registeredRoutes.push(...routes)
    router.addRoutes(routes)
  },
  findByName: function (name: string): RouteConfig {
    return this._registeredRoutes.find(r => r.name === name)
  },
  findByPath: function (fullPath: string): RouteConfig {
    return this._registeredRoutes.find(r => r.fullPath === fullPath)
  },
  lockRoute: function (route: Route) {
    let resolver
    this._lockedRoutes.set(route.path, {
      lockPromise: new Promise(resolve => { resolver = resolve }),
      resolver
    })
  },
  getRouteLock: function (route: Route) {
    return this._lockedRoutes.get(route.path) && this._lockedRoutes.get(route.path).lockPromise
  },
  unlockRoute: function (route: Route) {
    const locker = this._lockedRoutes.get(route.path)
    if (locker) {
      locker.resolver()
      this._lockedRoutes.delete(route.path)
    }
  }
}

export { RouterManager }
