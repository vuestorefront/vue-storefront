import VueGtm from 'vue-gtm';
import { router } from '@vue-storefront/core/app'
import { Logger } from '@vue-storefront/core/lib/logger'
export function beforeRegistration ({ Vue, config, isServer }) {
  if (config.googleTagManager.id && !isServer) {
    Vue.use(VueGtm, {
      id: config.googleTagManager.id,
      enabled: true,
      debug: config.googleTagManager.debug,
      vueRouter: router
    });
  } else {
    Logger.warn('Google Tag Manager extensions is not working. Ensure Google Tag Manager container ID is defined in config', 'GTM')()
  }
}
