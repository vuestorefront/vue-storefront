
import { VueStorefrontModule } from './modules'
import { Wishlist } from './modules/wishlist'
import { Mailer } from './modules/mailer'
import { registerModules } from 'theme/modules'

export const enabledModules: VueStorefrontModule[] = [
  Wishlist,
  ...registerModules
]
