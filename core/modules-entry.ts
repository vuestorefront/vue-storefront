
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Cms } from './modules/cms'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'
import { Breadcrumbs } from './modules/breadcrumbs'

// @depreciated, to be removed in 2.0  use registerModule instead
export const enabledModules: VueStorefrontModule[] = [
  Breadcrumbs,
  Cms,
  Order,
  User,
  ...registerModules
]
