
import { VueStorefrontModule } from './modules'
import { Wishlist } from './modules/wishlist'
import { registerModules } from 'src/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  ...registerModules
]
