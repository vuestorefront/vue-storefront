import { VueStorefrontModule, VueStorefrontModuleConfig } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'

const KEY = 'sample-custom-entity-gql'

const moduleConfig: VueStorefrontModuleConfig = {
  key: KEY,
  afterRegistration
}

export const SampleCustomEntityGql = new VueStorefrontModule(moduleConfig)