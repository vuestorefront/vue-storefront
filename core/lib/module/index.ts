// @deprecated from 2.0
import { Module } from 'vuex'
import { RouteConfig, NavigationGuard } from 'vue-router'
import Vue from 'vue'
import merge from 'lodash-es/merge'
import rootStore from '@vue-storefront/core/store'
import { Logger } from '@vue-storefront/core/lib/logger'
import { setupMultistoreRoutes } from '../multistore'
import { router } from '@vue-storefront/core/app'
import { isServer } from '@vue-storefront/core/helpers'
import { VSF, VueStorefrontModuleConfig } from './types'
import { doesStoreAlreadyExists, mergeStores } from './helpers'
import config from 'config'

const moduleExtendings: VueStorefrontModuleConfig[] = []
const registeredModules: VueStorefrontModuleConfig[] = []

function registerModules (modules: VueStorefrontModule[], context): void {
  modules.forEach(m => m.register())
  Logger.info('VS Modules registration finished.', 'module', {
    succesfulyRegistered: registeredModules.length + ' / ' + modules.length,
    registrationOrder: registeredModules
  }
  )()
}

function extendModule (moduleConfig: VueStorefrontModuleConfig) {
  moduleExtendings.push(moduleConfig)
}

class VueStorefrontModule {
  private _isRegistered = false
  private _c: VueStorefrontModuleConfig
  public constructor (_c: VueStorefrontModuleConfig) {
    this._c = _c
  }

  private static _extendStore (storeInstance: any, modules: { key: string, module: Module<any, any> }[], plugin: any): void {
    if (modules) modules.forEach(store => storeInstance.registerModule(store.key, store.module))
    if (plugin) storeInstance.subscribe(plugin)
  }

  private static _extendRouter (routerInstance, routes?: RouteConfig[], beforeEach?: NavigationGuard, afterEach?: NavigationGuard): void {
    if (routes) {
      setupMultistoreRoutes(config, routerInstance, routes)
    }
    if (beforeEach) routerInstance.beforeEach(beforeEach)
    if (afterEach) routerInstance.afterEach(afterEach)
  }

  private _extendModule (extendedConfig: VueStorefrontModuleConfig): void {
    const mergedStore = { modules: [], plugin: null }
    const key = this._c.key
    const originalStore = this._c.store
    const extendedStore = extendedConfig.store
    delete this._c.store
    delete extendedConfig.store
    this._c = merge(this._c, extendedConfig)
    mergedStore.modules = mergeStores(originalStore, extendedStore)
    mergedStore.plugin = extendedStore.plugin || originalStore.plugin || null
    this._c.store = mergedStore
    Logger.info('Module "' + key + '" has been succesfully extended.', 'module')()
  }

  public get config () {
    return this._c
  }

  /** Use only if you want to explicitly modify module config. Otherwise it's much easier to use `extendModule` */
  public set config (config) {
    this._c = config
  }

  public register (): VueStorefrontModuleConfig | void {
    if (!this._isRegistered) {
      Logger.warn('The module you are registering is using outdated API that will soon be depreciated. Please check https://docs.vuestorefront.io to learn more.', 'module', this._c.key)()
      let areStoresUnique = true
      const VSF: VSF = {
        Vue,
        config: config,
        store: rootStore,
        isServer
      }

      moduleExtendings.forEach(extending => {
        if (extending.key === this._c.key) this._extendModule(extending)
      })

      if (this._c.store) {
        this._c.store.modules.forEach(store => {
          if (doesStoreAlreadyExists(store.key, registeredModules)) {
            Logger.warn('Error during "' + this._c.key + '" module registration! Store with key "' + store.key + '" already exists!', 'module')()
            areStoresUnique = false
          }
        })
      }

      if (areStoresUnique) {
        if (this._c.beforeRegistration) {
          if (this._c.beforeRegistration.length === 1) {
            this._c.beforeRegistration(VSF)
          } else {
            Logger.warn('You are using outdated signature for beforeRegistration hook that soon will be deprecated and module will stop working properly. Please update to the new signature that can be found in our docs: https://docs.vuestorefront.io/guide/modules/introduction.html#beforeregistration', 'module', this._c.key)()
            this._c.beforeRegistration(Vue, config, rootStore, isServer)
          }
        }
        if (this._c.store) VueStorefrontModule._extendStore(rootStore, this._c.store.modules, this._c.store.plugin)
        if (this._c.router) VueStorefrontModule._extendRouter(router, this._c.router.routes, this._c.router.beforeEach, this._c.router.afterEach)
        registeredModules.push(this._c)
        this._isRegistered = true
        if (this._c.afterRegistration) {
          if (this._c.afterRegistration.length === 1) {
            this._c.afterRegistration(VSF)
          } else {
            Logger.warn('You are using outdated signature for afterRegistration hook that soon will be deprecated and module will stop working properly. Please update to the new signature that can be found in our docs: https://docs.vuestorefront.io/guide/modules/introduction.html#afterregistration', 'module', this._c.key)()
            this._c.afterRegistration(Vue, config, rootStore, isServer)
          }
        }
        return this._c
      }
    }
  }
}

function createModule (config: VueStorefrontModuleConfig): VueStorefrontModule {
  return new VueStorefrontModule(config)
}

export {
  VSF,
  VueStorefrontModuleConfig,
  extendModule,
  VueStorefrontModule,
  registerModules,
  createModule
}
