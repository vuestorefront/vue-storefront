import VueRouter from 'vue-router'
import { Store } from "vuex"

export interface StorefrontModule { (
  app: any,
  store: any,
  router: any,
  moduleConfig: any,
  appConfig: any ) : void
}

// because config can't be shared as peer dependency
let refs: any = {}

function injectReferences (app: any, store: Store<any>, router: VueRouter, config: any): void {
  refs.app = app
  refs.store = store
  refs.router = router
  refs.config = config
}

function registerModule (module: StorefrontModule, config?: any) {
  module(refs.app, refs.store, refs.router, config, refs.config)
}

export { refs, injectReferences, registerModule }
