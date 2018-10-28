import { Module } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import rootStore from '@vue-storefront/store'
import router from '@vue-storefront/core/router'
import { merge } from 'lodash-es'

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { module?: Module<any, any>, plugin?: Function, extend?: { key: string, module: Module<any, any> }[] };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (Vue: VueConstructor, config: Object) => void,
  afterRegistration?: (Vue: VueConstructor, config: Object) => void,
}

function extendRouter (routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
  if (routes) router.addRoutes(routes)
  if (beforeEach) router.beforeEach(beforeEach)
  if (afterEach) router.afterEach(afterEach)
}

function extendStore (key: string, store: Module<any, any>, plugin: any, extend: { key: string, module: Module<any, any> }[]) : void {
  const registeredStores: any = rootStore
  if (store) {
    // in case of conflicting keys throw warning 
    if (registeredStores._modules.root._children[key]) {
      throw new Error('Error during VS Module registration. Module with key "' + key + '" that you are trying to register already exists. If you are trying to extend currently existing module use store.extend property.')
    } else {
      rootStore.registerModule(key, store)
    }
  }
  if (plugin) rootStore.subscribe(plugin)
  if (extend) {
    extend.forEach(extendStore => {
      if (registeredStores._modules.root._children[extendStore.key]) {
        const newStore = merge(registeredStores._modules.root._children[extendStore.key]._rawModule, extendStore.module)
        rootStore.unregisterModule(extendStore.key)
        rootStore.registerModule(extendStore.key, newStore)
      } else {
        throw new Error('Error during VS Module registration. Module with key "' + key + '" that you are trying to extend already exists. If you want to register new Vuex store use store.module property.')
      }
    })
  }
}

export class VueStorefrontModule {
  constructor (
    private _c: VueStorefrontModuleConfig
  ) { }

  public extend (extendedConfig: VueStorefrontModuleConfig) {
    this._c = merge(this._c, extendedConfig)
  }
  /**
   * Registers module in app with before/after hooks, store and router.
   * Should be called inside an apps entry point available for both server and client.
   */
  public register (): void {
    if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, rootStore.state.config)
    if (this._c.store) extendStore(this._c.key, this._c.store.module, this._c.store.plugin, this._c.store.extend)
    if (this._c.router) extendRouter(this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
    if (this._c.afterRegistration) this._c.afterRegistration(Vue, rootStore.state.config)
  }
}
