
import { VueStorefrontModule } from './modules'
import { Mailchimp } from './modules/mailchimp'
import { Mailer } from './modules/mailer'
// import { Example } from './modules/module-template'

export const enabledModules: VueStorefrontModule[] = [
  Mailchimp,
  Mailer
  // Example
]
