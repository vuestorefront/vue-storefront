import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import merge from 'lodash-es/merge'
import RootState from '@vue-storefront/store/types/RootState';
import { Logger } from '@vue-storefront/core/lib/logger'

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function };
  router?: { beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
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
    let imoduleExists = false
    VueStorefrontModule._registeredModules.forEach(m => {
      if (m.store.modules.some(m => m.key === key)) imoduleExists = true
    })
    return imoduleExists
  }

  private static _extendStore (storeInstance: any, modules: { key: string, module: Module<any, any> }[], plugin: any) : void {
    if (modules) modules.forEach(store => storeInstance.registerModule(store.key, store.module))
    if (plugin) storeInstance.subscribe(plugin)
  }

  private static _extendRouter (routerInstance, beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
    if (beforeEach) routerInstance.beforeEach(beforeEach)
    if (afterEach) routerInstance.afterEach(afterEach)
  }

  public extend (extendedConfig: VueStorefrontModule) {
    const key = this._c.key
    this._c = merge(this._c, extendedConfig.config)
    Logger.info('Module "' + key + '" has been succesfully extended.', { tag: 'module'})
  }

  public register (storeInstance, routerInstance): void {
    let isUnique = true
    this._c.store.modules.forEach(store => {
      if (VueStorefrontModule._doesStoreAlreadyExists(store.key)) {
        Logger.error('Error during "' + this._c.key + '" module registration! Store with key "' + store.key + '" already exists!', { tag: 'module'})
        isUnique = false
      }
    })

    if (isUnique) {
      if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, storeInstance.state.config, storeInstance)
      if (this._c.store) VueStorefrontModule._extendStore(storeInstance, this._c.store.modules, this._c.store.plugin)
      if (this._c.router) VueStorefrontModule._extendRouter(routerInstance, this._c.router.beforeEach, this._c.router.afterEach)
      VueStorefrontModule._registeredModules.push(this._c)
      if (this._c.afterRegistration) this._c.afterRegistration(Vue, storeInstance.state.config, storeInstance)
      Logger.info('Module "' + this._c.key + '" has been succesfully registered.', { tag: 'module'})
    }
  }
}
