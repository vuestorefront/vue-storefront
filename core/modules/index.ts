import { Module } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue from 'vue'
import rootStore from '@vue-storefront/store'
import router from '@vue-storefront/core/router'

function extendRouter (routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard) {
  if (routes) router.addRoutes(routes)
  if (beforeEach) router.beforeEach(beforeEach)
  if (afterEach) router.afterEach(afterEach)
}

export interface VueStorefrontModuleConfig {
  key: string;
  store?: Module<any, any>;
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: () => void,
  afterRegistration?: () => void,
  clientSideOnly?: boolean
}

// export class ExtendedWebpackBuild {
//   constructor (
//     private _builds: Object[]
//   ) {}
//   public addBuild (build) {
//     this._builds.push(build)
//   }
// }

export class VueStorefrontModule {
  constructor (
    private _c: VueStorefrontModuleConfig
  ) { }

  public register(): void {
    if (this._c.clientSideOnly && Vue.prototype.$isServer)
    if (this._c.beforeRegistration) this._c.beforeRegistration()
    if (this._c.store) rootStore.registerModule(this._c.key, this._c.store)
    if (this._c.router) extendRouter(this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
    if (this._c.afterRegistration) this._c.afterRegistration()
  }
}

export function registerModules(modules: VueStorefrontModule[]) {
  modules.forEach(module => module.register())
}
