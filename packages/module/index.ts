
export interface StorefrontModule { (
  app: any,
  store: any,
  router: any,
  config: any,
  appConfig: any ) : void
}

// because config can't be shared as peer dependency
let refs = { app: null, store: null, router: null, config: null }

function injectReferences (app: any, store: any, router: any, config: any): any {
  refs.app = app
  refs.store = store
  refs.router = router
  refs.config = config
}

function registerModule (module: StorefrontModule, config: Object) {
  module(refs.app, refs.store, refs.router, config, refs.config)
}

export { refs, injectReferences, registerModule }
