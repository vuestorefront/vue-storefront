import { Logger } from '@vue-storefront/core/lib/logger'
import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig } from 'vue-router'

/** AsyncDataLoader helper for queueing the data fetching operations. The main purpose is to decentralize the `asyncData()` SSR method */
const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  addRoutes : function (routes: RouteConfig[], routerInstance: VueRouter = router) {
    this._registeredRoutes.push(...routes)
    router.addRoutes(routes)
  },
  findByName: function (name: string) {
    return this._registeredRoutes.find(r => r.name === name)
  },
  findByPath: function (fullPath: string) {
    return this._registeredRoutes.find(r => r.fullPath === fullPath)
  }  
}

export { RouterManager }
