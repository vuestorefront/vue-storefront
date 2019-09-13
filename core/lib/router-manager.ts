import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig, Route } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  _routeQueue: new Array<RouteConfig>(),
  _routeQueueFlushed: false,
  _routeLock: null,
  _routeDispatched: false,
  _callbacks: [],
  addRoutes: function (routes: RouteConfig[], routerInstance: VueRouter = router, useRouteQueue: boolean = false, priority: number = 0): void {
    if (useRouteQueue && !this._routeQueueFlushed) {
      this._routeQueue.push(...routes.map(route => { return { route: route, priority: priority } }))
    } else {
      const uniqueRoutes = routes.filter((route) => !this.isRouteAdded(this._registeredRoutes, route)) // to do - priority
      if (uniqueRoutes.length > 0) {
        this._registeredRoutes.push(...uniqueRoutes)
        routerInstance.addRoutes(uniqueRoutes)
      }
    }
  },
  flushRouteQueue: function (routerInstance: VueRouter = router): void {
    if (!this._routeQueueFlushed) {
      const readyQueue = this._routeQueue.map(queueItem => queueItem.route).filter(item => typeof item === 'object') // to do - priority, add once only
      // console.log('readyQueue', readyQueue)
      this._registeredRoutes.push(...readyQueue)
      routerInstance.addRoutes(readyQueue)
      this._routeQueueFlushed = true
      this._routeQueue = []
    }
  },
  isRouteAdded: function (addedRoutes: RouteConfig[], route: RouteConfig) {
    return addedRoutes.findIndex((addedRoute) => addedRoute.name === route.name && addedRoute.path === route.path) >= 0
  },
  addDispatchCallback: function (callback: Function) {
    this._callbacks.push(callback)
  },
  findByName: function (name: string): RouteConfig {
    const registeredRoute = this._registeredRoutes.findIndex(r => r.name === name)
    if (registeredRoute) return registeredRoute
    if (this._routeQueueFlushed) return null
    const queuedRoute = this._routeQueue.find(queueItem => queueItem.route.name === name)
    return queuedRoute ? queuedRoute.route : null
  },
  findByPath: function (path: string): RouteConfig {
    const registeredRoute = this._registeredRoutes.find(r => r.path === path)
    if (registeredRoute) return registeredRoute
    if (this._routeQueueFlushed) return null
    const queuedRoute = this._routeQueue.find(queueItem => queueItem.route.path === path)
    return queuedRoute ? queuedRoute.route : null
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
