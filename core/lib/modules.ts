import { Store } from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'
import RootState from '@vue-storefront/core/types/RootState'
import { HeadManager } from '@vue-storefront/core/helpers/extended-head.factory'
import { AdditionalContentRegistry } from '@vue-storefront/core/additional-content'
import { RequestServices } from '@vue-storefront/core/request-services'

export interface StorefrontModuleServices {
  head: HeadManager,
  additionalContent: AdditionalContentRegistry,
  request: RequestServices
}

export interface StorefrontModuleOptions {
  app: Vue,
  store: Store<RootState>,
  router: VueRouter,
  moduleConfig: any,
  appConfig: any,
  services: StorefrontModuleServices
}

export type StorefrontModule = (
  options: StorefrontModuleOptions
) => void

type StorefrontModuleScope = 'global' | 'application'

let refs: any = {}
const registeredModules: StorefrontModule[] = []
const globallyRegisteredModules: StorefrontModule[] = []
const applicationRegisteredModules = new WeakMap<Vue, StorefrontModule[]>()

function injectReferences (
  app: any,
  store: Store<any>,
  router: VueRouter,
  config: any,
  services: StorefrontModuleServices
): void {
  refs.app = app
  refs.store = store
  refs.router = router
  refs.config = config
  refs.services = services
}

function getApplicationRegisteredModules (): StorefrontModule[] {
  let modules = applicationRegisteredModules.get(refs.app)
  if (!modules) {
    modules = []
    applicationRegisteredModules.set(refs.app, modules)
  }
  return modules
}

function registerScopedModule (
  module: StorefrontModule,
  config: any,
  scope: StorefrontModuleScope
) {
  const scopedModules = scope === 'application'
    ? getApplicationRegisteredModules()
    : globallyRegisteredModules

  if (scopedModules.includes(module)) {
    return
  }

  module({
    app: refs.app,
    store: refs.store,
    router: refs.router,
    appConfig: refs.config,
    moduleConfig: config,
    services: refs.services
  })
  scopedModules.push(module)

  if (!registeredModules.includes(module)) {
    registeredModules.push(module)
  }
}

function registerModule (module: StorefrontModule, config?: any) {
  registerScopedModule(module, config, 'global')
}

function registerApplicationModule (module: StorefrontModule, config?: any) {
  registerScopedModule(module, config, 'application')
}

function isModuleRegistered (name: string): boolean {
  return registeredModules.some(m => m.name === name)
}

export {
  refs,
  injectReferences,
  registerModule,
  registerApplicationModule,
  isModuleRegistered
}
