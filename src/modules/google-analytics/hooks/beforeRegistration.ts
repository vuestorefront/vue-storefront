import VueAnalytics from 'vue-analytics'
import { router } from '@vue-storefront/core/app'

export function beforeRegistration(Vue, config, store) {
    if (config.analytics.id && !Vue.prototype.$isServer) {
        Vue.use(VueAnalytics, {
            id: config.analytics.id,
            router: store.router,
            ecommerce: {
                enabled: true,
                enhanced: true
            }
        })
    } else {
        console.log('Ensure Google Analytics account ID is defined in config')
    }
}
