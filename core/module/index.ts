import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import rootStore from '@vue-storefront/store'
import router from '@vue-storefront/core/router'
import { merge } from 'lodash-es'
import RootState from '@vue-storefront/store/types/RootState';

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>) => void,
  afterRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>) => void,
}

export class VueStorefrontModule {
  constructor (
    private _c: VueStorefrontModuleConfig,
  ) { }

  public get config () {
    return this._c
  }
  
  private static _registeredModules: VueStorefrontModuleConfig[] = []

  private static _doesStoreAlreadyExists (key: string) : boolean {
    VueStorefrontModule._registeredModules.forEach(m => {
      if (m.store.modules.some(m => m.key === key)) return true
    })
    return false
  }

  private static _getRegisteredStore (key: string) : { key: string, module: Module<any, any> } {
    VueStorefrontModule._registeredModules.forEach(m => {
      m.store.modules.forEach(store => {
        if (store.key === key ) return store
      })
    })
    throw new Error('Store with key' + key + ' does not exist.')
  }

  private static _extendStore (modules: { key: string, module: Module<any, any> }[], plugin: any) : void {
    if (modules) {
      modules.forEach(store => {
        if (VueStorefrontModule._doesStoreAlreadyExists(store.key)) {
          const mergedStore = merge(
            VueStorefrontModule._getRegisteredStore(store.key),
            store.module
          )
          rootStore.unregisterModule(store.key)
          rootStore.registerModule(store.key, mergedStore)
        } else {
          rootStore.registerModule(store.key, store.module)
        }
      })
    }
    if (plugin) rootStore.subscribe(plugin)
  }

  private static _extendRouter (routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
    if (routes) router.addRoutes(routes)
    if (beforeEach) router.beforeEach(beforeEach)
    if (afterEach) router.afterEach(afterEach)
  }

  public extend (extendedConfig: VueStorefrontModule) {
    this._c = merge(this._c, extendedConfig.config)
  }

  public register (): void {
    if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, rootStore.state.config, rootStore)
    if (this._c.store) VueStorefrontModule._extendStore(this._c.store.modules, this._c.store.plugin)
    if (this._c.router) VueStorefrontModule._extendRouter(this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
    VueStorefrontModule._registeredModules.push(this._c)
    if (this._c.afterRegistration) this._c.afterRegistration(Vue, rootStore.state.config, rootStore)
  }
}
