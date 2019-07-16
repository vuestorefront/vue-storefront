
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Cms } from './modules/cms'
import { User } from './modules/user'
import { registerModules } from 'src/modules'

// @deprecated from 2.0,  use registerModule instead
export const enabledModules: VueStorefrontModule[] = [
  Cms,
  User,
  ...registerModules
]
