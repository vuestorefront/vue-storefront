import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import merge from 'lodash-es/merge'
import RootState from '@vue-storefront/store/types/RootState'
import rootStore from '@vue-storefront/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean,) => void,
  afterRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean) => void,
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
    let moduleExists = false
    VueStorefrontModule._registeredModules.forEach(m => {
      if (m.store) {
        if (m.store.modules.some(m => m.key === key)) moduleExists = true
      }
    })
    return moduleExists
  }

  private static _extendStore (storeInstance: any, modules: { key: string, module: Module<any, any> }[], plugin: any) : void {
    if (modules) modules.forEach(store => storeInstance.registerModule(store.key, store.module))
    if (plugin) storeInstance.subscribe(plugin)
  }

  private static _extendRouter (routerInstance, routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
    if (routes) {
      setupMultistoreRoutes(rootStore.state.config, routerInstance, routes)
      routerInstance.addRoutes(routes)
    }
    if (beforeEach) routerInstance.beforeEach(beforeEach)
    if (afterEach) routerInstance.afterEach(afterEach)
  }

  public extend (extendedConfig: VueStorefrontModule) {
    const key = this._c.key
    this._c = merge(this._c, extendedConfig.config)
    Logger.info('Module "' + key + '" has been succesfully extended.', 'module')()
  }

  public register (storeInstance, routerInstance): VueStorefrontModuleConfig | void {
    let isUnique = true
    if ( this._c.store) {
      this._c.store.modules.forEach(store => {
        if (VueStorefrontModule._doesStoreAlreadyExists(store.key)) {
          Logger.error('Error during "' + this._c.key + '" module registration! Store with key "' + store.key + '" already exists!', 'module')()
          isUnique = false
        }
      })
    }

    if (isUnique) {
      const isServer = typeof window === undefined
      if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, storeInstance.state.config, storeInstance, isServer)
      if (this._c.store) VueStorefrontModule._extendStore(storeInstance, this._c.store.modules, this._c.store.plugin)
      if (this._c.router) VueStorefrontModule._extendRouter(routerInstance, this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
      VueStorefrontModule._registeredModules.push(this._c)
      if (this._c.afterRegistration) this._c.afterRegistration(Vue, storeInstance.state.config, storeInstance, isServer)
      return this._c
    }
  }
}
