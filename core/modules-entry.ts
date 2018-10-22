
import { VueStorefrontModule } from './modules'
import { Cart } from './modules/cart'
import { Review } from './modules/review'
import { Wishlist } from './modules/wishlist'
import { Mailchimp } from './modules/mailchimp'
import { Mailer } from './modules/mailer'
// import { Example } from './modules/module-template'

export const enabledModules: VueStorefrontModule[] = [
  Cart,
  Review,
  Mailchimp,
  Mailer,
  Wishlist,
  // Example
]
