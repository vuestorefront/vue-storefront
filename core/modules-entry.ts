
import { VueStorefrontModule, VueStorefrontModuleConfig } from './modules'
import { Cart } from './modules/cart'
import { Review } from './modules/review'
import { Wishlist } from './modules/wishlist'
import { Mailchimp } from './modules/mailchimp'
import { Mailer } from './modules/mailer'
import { Example } from './modules/module-template'


// You can extend any module before registration like this
const extendedExample: VueStorefrontModuleConfig = {
  key: 'extend',
  afterRegistration: function(Vue, config) {
    console.info('Hello, im extended now')
  }
}

Example.extend(extendedExample)

// This modules will be registered in the app
export const enabledModules: VueStorefrontModule[] = [
  Cart,
  Review,
  Mailchimp,
  Mailer,
  Wishlist,
  // Example
]
