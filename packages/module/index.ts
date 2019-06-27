import { StorefrontModule } from './index.d'

let dependencies = { app: null, store: null, router: null, config: null }

// Use this function in core to link object references
export function injectDependencies (app, store, router, config) {
  dependencies.app = app
  dependencies.store = store
  dependencies.router = router
  dependencies.config = config
}

export function registerModule(module: StorefrontModule, config: Object) {
  module(dependencies.app, dependencies.store, dependencies.router, config, dependencies.config)
}

