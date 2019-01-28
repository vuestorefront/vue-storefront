import { Module, Store } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue, { VueConstructor } from 'vue'
import merge from 'lodash-es/merge'
import RootState from '@vue-storefront/store/types/RootState'
import rootStore from '@vue-storefront/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { setupMultistoreRoutes } from '@vue-storefront/store/lib/multistore'
import { router } from '@vue-storefront/core/app'
import { isServer } from '@vue-storefront/core/helpers'

export interface VueStorefrontModuleConfig {
  key: string;
  store?: { modules?: { key: string, module: Module<any, any> }[], plugin?: Function };
  router?: { routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard },
  beforeRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean,) => void,
  afterRegistration?: (Vue?: VueConstructor, config?: Object, store?: Store<RootState>, isServer?: boolean) => void,
}

const moduleExtendings = []

export function extendModule(moduleConfig) {
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
  
  private _extend (extendedConfig: VueStorefrontModule) {
    const key = this._c.key
    this._c = merge(this._c, extendedConfig)
    Logger.info('Module "' + key + '" has been succesfully extended.', 'module')()
  }

  public register (): VueStorefrontModuleConfig | void {
    if (!this._isRegistered) {
      moduleExtendings.forEach(extending => {
        if (extending.key === this._c.key) this._extend(extending)
      })

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
        if (this._c.beforeRegistration) this._c.beforeRegistration(Vue, rootStore.state.config, rootStore, isServer)
        if (this._c.store) VueStorefrontModule._extendStore(rootStore, this._c.store.modules, this._c.store.plugin)
        if (this._c.router) VueStorefrontModule._extendRouter(router, this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
        VueStorefrontModule._registeredModules.push(this._c)
        this._isRegistered = true
        if (this._c.afterRegistration) this._c.afterRegistration(Vue, rootStore.state.config, rootStore, isServer)
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