import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/module'
import { routes } from './router/routes'

const KEY = 'raw-output-example'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  router: { routes }
}

export const RawOutputExample = new VueStorefrontModule(moduleConfig)