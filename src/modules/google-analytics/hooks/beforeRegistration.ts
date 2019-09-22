import VueAnalytics from 'vue-analytics'
import { router } from '@vue-storefront/core/app'
import { Logger } from '@vue-storefront/core/lib/logger'
import { once } from '@vue-storefront/core/helpers'

export function beforeRegistration ({ Vue, config, store, isServer }) {
  if (config.analytics.id && !isServer) {
    once('__VUE_EXTEND_ANALYTICS__', () => {
      Vue.use(VueAnalytics, {
        id: config.analytics.id,
        router,
        ecommerce: {
          enabled: true
        }
      })
    })
  } else {
    Logger.warn(
      'Google Analytics extension is not working. Ensure Google Analytics account ID is defined in config',
      'GA'
    )()
  }
}
