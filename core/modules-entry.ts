
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { registerModules } from 'src/modules/client'

// @deprecated from 2.0,  use registerModule instead
export const enabledModules: VueStorefrontModule[] = [
  ...registerModules
]
