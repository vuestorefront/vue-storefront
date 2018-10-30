import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import rootStore from '@vue-storefront/store'
import router from '@vue-storefront/core/router'
import { merge } from 'lodash-es'
import RootState from '@vue-storefront/store/types/RootState';

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { module?: Module<any, any>, plugin?: Function, extend?: { key: string, module: Module<any, any> }[] };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>) => void,
  afterRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>) => void,
}

export class VueStorefrontModule {
  constructor (
    private _c: VueStorefrontModuleConfig,
  ) { }

  private static _registeredModules: VueStorefrontModuleConfig[] = []

  private static _extendStore (key: string, store: Module<any, any>, plugin: any, extend: { key: string, module: Module<any, any> }[]) : void {
    if (store) {
      if (VueStorefrontModule._registeredModules.some(m => m.key === key)) {
        throw new Error('Error during VS Module registration. Module with key "' + key + '" that you are trying to register already exists. If you are trying to extend currently existing module use store.extend property.')
      } else {
        rootStore.registerModule(key, store)
      }
    }
    if (plugin) rootStore.subscribe(plugin)
    if (extend) {
      extend.forEach(extendStore => {
        if (VueStorefrontModule._registeredModules.some(m => m.key === extendStore.key)) {
          const newStore = merge(
            VueStorefrontModule._registeredModules.find(m => m.key === extendStore.key).store.module, 
            extendStore.module
          )
          rootStore.unregisterModule(extendStore.key)
          rootStore.registerModule(extendStore.key, newStore)
        } else {
          throw new Error('Error during VS Module registration. Module with key "' + key + '" that you are trying to extend already exists. If you want to register new Vuex store use store.module property.')
        }
      })
    }
  }

  private static _extendRouter (routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
    if (routes) router.addRoutes(routes)
    if (beforeEach) router.beforeEach(beforeEach)
    if (afterEach) router.afterEach(afterEach)
  }
  /**
   * Merge new VSM config with current one with lodash deep merge startegy (leafs with same names are overwritten). 
   * 
   * **You can't extend already registered module. Do it before registration.**
   * 
   * Example:
   * ````js
   * const extendedExample: VueStorefrontModuleConfig = { 
   *  key: 'extend', 
   *  afterRegistration: newAfterRegistrationHook
   * }
   * Example.extend(extendedExample)
   * ````
   * @param extendedConfig config object that will be merged into currently existing one
   */
  public extend (extendedConfig: VueStorefrontModuleConfig) {
    this._c = merge(this._c, extendedConfig)
  }

  public register (): void {
    if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, rootStore.state.config, rootStore)
    if (this._c.store) VueStorefrontModule._extendStore(this._c.key, this._c.store.module, this._c.store.plugin, this._c.store.extend)
    if (this._c.router) VueStorefrontModule._extendRouter(this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
    VueStorefrontModule._registeredModules.push(this._c)
    if (this._c.afterRegistration) this._c.afterRegistration(Vue, rootStore.state.config, rootStore)
  }
}
