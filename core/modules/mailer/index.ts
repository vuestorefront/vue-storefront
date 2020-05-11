import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { mailerStore } from './store'

export const MailerModule: StorefrontModule = function ({ store }) {
  store.registerModule('mailer', mailerStore)
}
