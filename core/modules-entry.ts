
import { VueStorefrontModule } from './modules'
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
