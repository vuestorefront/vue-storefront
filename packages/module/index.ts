import { StorefrontModule } from './index.d'

let refs = { app: null, store: null, router: null, config: null }

function injectReferences (app, store, router, config) {
  refs.app = app
  refs.store = store
  refs.router = router
  refs.config = config
}

function registerModule (module: StorefrontModule, config: Object) {
  module(refs.app, refs.store, refs.router, config, refs.config)
}

export { StorefrontModule, refs, injectReferences, registerModule }
