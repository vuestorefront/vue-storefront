import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import merge from 'lodash-es/merge'
import some from 'lodash-es/some'
import find from 'lodash-es/find'
import RootState from '@vue-storefront/core/types/RootState'
import rootStore from '@vue-storefront/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { setupMultistoreRoutes } from './multistore'
import { router } from '@vue-storefront/core/app'
import { isServer } from '@vue-storefront/core/helpers'

export interface VSF {
  Vue?: VueConstructor, 
  config?: Object, 
  store?: Store<RootState>, 
  isServer?: boolean
}

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (VSF: VSF | VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean) => void,
  afterRegistration?: (VSF: VSF | VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean) => void,
}

const moduleExtendings: VueStorefrontModuleConfig[] = []

/** Provide `VueStorefrontModule` config that will be merged with module with the same `key` as this config.
 * It's important to call this function before module is registered.
 *
 * Read more: [here](https://docs.vuestorefront.io/guide/modules/introduction.html#extending-and-overriding-vue-storefront-modules) */
export function extendModule(moduleConfig: VueStorefrontModuleConfig) {
  moduleExtendings.push(moduleConfig)
}

export class VueStorefrontModule {
  private _isRegistered = false
  constructor (
    private _c: VueStorefrontModuleConfig,
  ) { }

  public get config () {
    return this._c
  }

  /** Use only if you want to explicitly modify module config. Otherwise it's much easier to use `extendModule` */
  public set config (config) {
    this._c = config
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

  private _extend (extendedConfig: VueStorefrontModuleConfig) {
    const mergedStore = { modules: [] };
    const key = this._c.key
    const originalStore = this._c.store
    const extendedStore = extendedConfig.store
    delete this._c.store
    delete extendedConfig.store
    this._c = merge(this._c, extendedConfig)
    mergedStore.modules = this._mergeStore(originalStore, extendedStore)
    this._c.store = mergedStore
    Logger.info('Module "' + key + '" has been succesfully extended.', 'module')()
  }

  private _mergeStore(originalStore, extendedStore) {
    let mergedArray = []
    originalStore.modules.map(item => {
      mergedArray.push(merge(item, find(extendedStore.modules, { 'key' : item.key })));
    })
    extendedStore.modules.map(extendedStoreItem => {
      if(some(originalStore.modules, { 'key' : extendedStoreItem.key}) === false){
        mergedArray.push(extendedStoreItem)
      }
    })
    return mergedArray
  }

  public register (): VueStorefrontModuleConfig | void {

    const VSF = {
      Vue, 
      config: rootStore.state.config, 
      store: rootStore, 
      isServer
    }

    if (!this._isRegistered) {
      moduleExtendings.forEach(extending => {
        if (extending.key === this._c.key) this._extend(extending)
      })

      let isUnique = true
      if ( this._c.store) {
        this._c.store.modules.forEach(store => {
          if (VueStorefrontModule._doesStoreAlreadyExists(store.key)) {
            Logger.warn('Error during "' + this._c.key + '" module registration! Store with key "' + store.key + '" already exists!', 'module')()
            isUnique = false
          }
        })
      }
      if (isUnique) {
        if (this._c.beforeRegistration) {
          if (this._c.beforeRegistration.length === 1 ) { 
            this._c.beforeRegistration(VSF) 
          } else {
            Logger.warn('You are using outdated signature for beforeRegistration hook that soon will be depreciated and module will stop working properly. Please update to the new signature that can be found in our docs: https://docs.vuestorefront.io/guide/modules/introduction.html#beforeregistration', 'module', this._c.key)()
            this._c.beforeRegistration(Vue, rootStore.state.config, rootStore, isServer)
          }
        }
        if (this._c.store) VueStorefrontModule._extendStore(rootStore, this._c.store.modules, this._c.store.plugin)
        if (this._c.router) VueStorefrontModule._extendRouter(router, this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
        VueStorefrontModule._registeredModules.push(this._c)
        this._isRegistered = true
        if (this._c.afterRegistration) {
          if (this._c.afterRegistration.length === 1 ) {
            this._c.afterRegistration(VSF)
           } else {
            Logger.warn('You are using outdated signature for afterRegistration hook that soon will be depreciated and module will stop working properly. Please update to the new signature that can be found in our docs: https://docs.vuestorefront.io/guide/modules/introduction.html#afterregistration', 'module', this._c.key)()
            this._c.afterRegistration(Vue, rootStore.state.config, rootStore, isServer)
           } 
        }
        return this._c
      }
    }
  }
}

export function registerModules (modules: VueStorefrontModule[], context): void {
  let registeredModules = []
  modules.forEach(m => registeredModules.push(m.register()))
  Logger.info('VS Modules registration finished.', 'module', {
      succesfulyRegistered: registeredModules.length + ' / ' + modules.length,
      registrationOrder: registeredModules
    }
  )()
}
