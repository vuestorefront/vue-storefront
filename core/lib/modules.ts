import { Store } from 'vuex'
import VueRouter from 'vue-router'
import Vue from 'vue'
import RootState from '@vue-storefront/core/types/RootState'

export type StorefrontModule = (
  options: {
    app: Vue,
    store: Store<RootState>,
    router: VueRouter,
    moduleConfig: any,
    appConfig: any
  }
) => void

let refs: any = {}
let registeredModules: StorefrontModule[] = []

function injectReferences (app: any, store: Store<any>, router: VueRouter, config: any): void {
  refs.app = app
  refs.store = store
  refs.router = router
  refs.config = config
}

function registerModule (module: StorefrontModule, config?: any) {
  if (!registeredModules.includes(module)) {
    module({
      app: refs.app,
      store: refs.store,
      router: refs.router,
      appConfig: refs.config,
      moduleConfig: config
    })
    registeredModules.push(module)
  }
}

function isModuleRegistered (name: string): boolean {
  return registeredModules.some(m => m.name === name)
}

export { refs, injectReferences, registerModule, isModuleRegistered }
