import { Module } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import rootStore from '@vue-storefront/store'
import router from '@vue-storefront/core/router'

function extendRouter (routes?, beforeEach?, afterEach?) {
  if (routes) router.addRoutes(routes)
  if (beforeEach)router.beforeEach(beforeEach)
  if (afterEach) router.afterEach(afterEach)
}

export class VueStorefrontModule {
  constructor (
    private _key: string, 
    private _store?: Module<any, any>,
    private _router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
    private _beforeRegistration?: (Vue?: VueConstructor<Vue>, config?: Object) => void,
    private _afterRegistration?: (Vue?: VueConstructor<Vue>, config?: Object) => void,
  ) { }

  public register(): void {
    if (this._beforeRegistration) this._beforeRegistration(Vue)
    if (this._store) rootStore.registerModule(this._key, this._store)
    if (this._router) extendRouter(this._router.routes, this._router.beforeEach, this._router.afterEach)
    if (this._afterRegistration) this._afterRegistration(Vue, rootStore.state)
  }
}

export function registerModules(modules: VueStorefrontModule[]) {
  modules.forEach(module => module.register())
}
