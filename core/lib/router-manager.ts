import { Logger } from '@vue-storefront/core/lib/logger'
import { router } from '@vue-storefront/core/app'
import VueRouter, { RouteConfig } from 'vue-router'

const RouterManager = {
  _registeredRoutes: new Array<RouteConfig>(),
  addRoutes : function (routes: RouteConfig[], routerInstance: VueRouter = router): void {
    this._registeredRoutes.push(...routes)
    router.addRoutes(routes)
  },
  findByName: function (name: string): RouteConfig {
    return this._registeredRoutes.find(r => r.name === name)
  },
  findByPath: function (fullPath: string): RouteConfig {
    return this._registeredRoutes.find(r => r.fullPath === fullPath)
  }  
}

export { RouterManager }
