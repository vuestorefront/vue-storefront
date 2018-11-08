
import { VueStorefrontModule } from '@vue-storefront/module'
import { Wishlist } from './modules/wishlist'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  Order,
  User,
  ...registerModules
]
