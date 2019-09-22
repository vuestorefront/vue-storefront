
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Cms } from './modules/cms'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'
import { Breadcrumbs } from './modules/breadcrumbs'
export const enabledModules: VueStorefrontModule[] = [
  Breadcrumbs,
  Cms,
  Order,
  User,
  ...registerModules
]
