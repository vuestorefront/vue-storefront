
import { VueStorefrontModule } from '@vue-storefront/core/lib/module'
import { Wishlist } from './modules/wishlist'
import { Cms } from './modules/cms'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'
import { Breadcrumbs } from './modules/breadcrumbs'
export const enabledModules: VueStorefrontModule[] = [
  Breadcrumbs,
  Wishlist,
  Cms,
  Order,
  User,
  ...registerModules
]
