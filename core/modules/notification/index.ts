import { notificationStore } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const NotificationModule: StorefrontModule = function (app, store, router, moduleConfig, appConfig) {
  store.registerModule('notification', notificationStore)
}
