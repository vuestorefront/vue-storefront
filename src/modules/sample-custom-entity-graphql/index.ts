import { createModule } from '@vue-storefront/core/lib/module'
import { afterRegistration } from './hooks/afterRegistration'

const KEY = 'sample-custom-entity-gql'
export const SampleCustomEntityGql = createModule({
  key: KEY,
  afterRegistration,
})
