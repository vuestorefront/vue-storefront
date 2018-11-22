
import { VueStorefrontModule } from '@vue-storefront/module'
import { Wishlist } from './modules/wishlist'
import { Cms } from './modules/cms'
import { DataManager } from './modules/data-manager'
import { Order } from './modules/order'
import { User } from './modules/user'
import { registerModules } from 'src/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  Cms,
  Order,
  DataManager,
  User,
  ...registerModules
]
