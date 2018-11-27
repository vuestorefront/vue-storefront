import VueAnalytics from 'vue-analytics'
import { router } from '@vue-storefront/core/app'
import Vue from 'vue'

export function beforeRegistration(isServer, config, store) {
    if (config.analytics.id && !isServer) {
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
