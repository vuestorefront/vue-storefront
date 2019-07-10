import { StorefrontModule } from '@vue-storefront/module'
import { mailerStore } from './store'

const KEY = 'mailer'
export const MailerModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, mailerStore)
}
