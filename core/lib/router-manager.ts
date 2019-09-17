import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig, Route } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  _routeLock: null,
  _routeDispatched: false,
  _callbacks: [],
  addRoutes: function (routes: RouteConfig[], routerInstance: VueRouter = router): void {
    const uniqueRoutes = routes.filter(
      (route) => this._registeredRoutes.findIndex(
        (registeredRoute) => registeredRoute.name === route.name && registeredRoute.path === route.path
      ) === -1
    )
    if (uniqueRoutes.length > 0) {
      this._registeredRoutes.push(...uniqueRoutes)
      router.addRoutes(uniqueRoutes)
    }
  },
  addDispatchCallback: function (callback: Function) {
    this._callbacks.push(callback)
  },
  findByName: function (name: string): RouteConfig {
    return this._registeredRoutes.find(r => r.name === name)
  },
  findByPath: function (fullPath: string): RouteConfig {
    return this._registeredRoutes.find(r => r.fullPath === fullPath)
  },
  lockRoute: function () {
    let resolver
    this._routeLock = {
      lockPromise: new Promise(resolve => { resolver = resolve }),
      resolver
    }
  },
  isRouteProcessing: function () {
    return !!this._routeLock
  },
  isRouteDispatched: function () {
    return !!this._routeDispatched
  },
  getRouteLockPromise: function () {
    if (this._routeLock) return this._routeLock.lockPromise
    return Promise.resolve()
  },
  unlockRoute: function () {
    if (this._routeLock) {
      this._routeLock.resolver()
      this._routeLock = null
    }
    this._routeDispatched = true
    this._callbacks.forEach(callback => {
      callback()
    });
  }
}

export { RouterManager }
