
import { VueStorefrontModule } from '@vue-storefront/module'
import { Wishlist } from './modules/wishlist'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'
import { Breadcrumbs } from './modules/breadcrumbs'
export const enabledModules: VueStorefrontModule[] = [
  Breadcrumbs,
  Wishlist,
  Order,
  User,
  ...registerModules
]
