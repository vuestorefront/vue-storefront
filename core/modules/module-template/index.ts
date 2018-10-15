import { store } from './store'
import { beforeRegistration } from './hooks/beforeRegistration'
import { afterRegistration } from './hooks/afterRegistration'
import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/modules'
import { routes } from './router/routes'
import { beforeEach } from './router/beforeEach'
import { afterEach } from './router/afterEach'

// This key will be used for creating extension keys in vuex and other key-based plugins
export const KEY = 'example'

// We are passing everything that we want to extend the app to moduleConfig
const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  store,
  beforeRegistration,
  afterRegistration,
  router: { routes, beforeEach, afterEach }
}

// ...and exporting VueStorefrontModule with provided config
export const Example = new VueStorefrontModule(moduleConfig)