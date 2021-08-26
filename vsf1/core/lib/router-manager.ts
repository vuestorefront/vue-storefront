import { baseRouter } from '@vue-storefront/core/app'
import { RouteConfig } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  _routeQueue: new Array<RouteConfig>(),
  _routeQueueFlushed: false,
  _routeLock: null,
  _routeDispatched: false,
  _callbacks: [],
  addRoutes: function (routes: RouteConfig[], useRouteQueue: boolean = false, priority: number = 0): void {
    if (useRouteQueue && !this._routeQueueFlushed) {
      this._routeQueue.push(...routes.map(route => { return { route: route, priority: priority } }))
    } else {
      const uniqueRoutes = routes.filter((route) => {
        return this._registeredRoutes.findIndex(registeredRoute => registeredRoute.route.name === route.name && registeredRoute.route.path === route.path) < 0
      })
      if (uniqueRoutes.length > 0) {
        this._registeredRoutes.push(...uniqueRoutes.map(route => { return { route: route, priority: priority } }))
        baseRouter.addRoutes(uniqueRoutes)
      }
    }
  },
  flushRouteQueue: function (): void {
    if (!this._routeQueueFlushed) {
      this.addRoutesByPriority(this._routeQueue)
      this._routeQueueFlushed = true
      this._routeQueue = []
    }
  },
  addRoutesByPriority: function (routesData) {
    const routesToAdd = []
    for (const routeData of routesData) {
      let exisitingIndex = routesToAdd.findIndex(r => r.route.name === routeData.route.name && r.route.path === routeData.route.path)
      if ((exisitingIndex >= 0) && (routesToAdd[exisitingIndex].priority < routeData.priority)) { // same priority doesn't override exisiting
        routesToAdd.splice(exisitingIndex, 1)
        exisitingIndex = -1
      }
      if (exisitingIndex < 0) {
        routesToAdd.push(routeData)
      }
    }
    this._registeredRoutes.push(...routesToAdd)
    baseRouter.addRoutes(routesToAdd.map(r => r.route))
  },
  isRouteAdded: function (addedRoutes: any[], route: RouteConfig) {
    return addedRoutes.findIndex((addedRoute) => addedRoute.route.name === route.name && addedRoute.route.path === route.path) >= 0
  },
  addDispatchCallback: function (callback: Function) {
    this._callbacks.push(callback)
  },
  findByName: function (name: string): RouteConfig {
    return this.findByProperty('name', name)
  },
  findByPath: function (path: string): RouteConfig {
    return this.findByProperty('path', path)
  },
  findByProperty: function (property: string, value: string): RouteConfig {
    const registeredRoute = this._registeredRoutes.find(r => r.route[property] === value)
    if (registeredRoute) return registeredRoute.route
    if (this._routeQueueFlushed) return null
    const queuedRoute = this._routeQueue.find(queueItem => queueItem.route[property] === value)
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
