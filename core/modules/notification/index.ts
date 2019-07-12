import { notificationStore } from './store'
import { StorefrontModule } from '@vue-storefront/module';

export const NotificationModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('notification', notificationStore)
}
