import { store } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { routes } from './router/routes'
import { beforeEach } from './router/beforeEach'
import { afterEach } from './router/afterEach'

// This key will be used for creating extension keys in vuex and other key-based plugins
export const KEY = 'example'

// Pass everything that we want to extend the app to moduleConfig. Only key is required, rest is optional.
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store,
  beforeRegistration,
  afterRegistration,
  router: { routes, beforeEach, afterEach }
}

// ...and export VueStorefrontModule with provided config so it can be registered in modules entry
export const Example = new VueStorefrontModule(moduleConfig)