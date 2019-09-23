import { StorefrontModule } from '@vue-storefront/core/lib/modules'
import { mailerStore } from './store'

export const MailerModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('mailer', mailerStore)
}
