
import { VueStorefrontModule } from './modules'
import { Wishlist } from './modules/wishlist'
import { registerModules } from 'theme/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  ...registerModules
]
