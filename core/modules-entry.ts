
import { VueStorefrontModule } from './modules'
import { Cart } from './modules/cart'
import { Review } from './modules/review'
import { Mailchimp } from './modules/mailchimp'
import { Mailer } from './modules/mailer'
// import { Example } from './modules/module-template'

export const enabledModules: VueStorefrontModule[] = [
  Cart,
  Review,
  Mailchimp,
  Mailer
  // Example
]
