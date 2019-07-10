import { notificationStore } from './store'
import { StorefrontModule } from '@vue-storefront/module';

const KEY = 'notification'
export const NotificationModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule(KEY, notificationStore)
}
