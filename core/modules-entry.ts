
import { VueStorefrontModule } from './modules'
import { Cart } from './modules/cart'
import { Review } from './modules/review'
import { Wishlist } from './modules/wishlist'
import { Mailer } from './modules/mailer'
import { registerModules } from 'theme/modules'



// This modules will be registered in the app
export const enabledModules: VueStorefrontModule[] = [
  Cart,
  Review,
  Mailer,
  Wishlist,
  ...registerModules
]
