
import { VueStorefrontModule } from '@vue-storefront/module'
import { Wishlist } from './modules/wishlist'
import { Cms } from './modules/cms'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  Cms,
  Order,
  User,
  ...registerModules
]
