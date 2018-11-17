import VueAnalytics from 'vue-analytics'

export function beforeRegistration(Vue, config) {
    if (config.analytics.id && !Vue.prototype.$isServer) {
        Vue.use(VueAnalytics, {
            id: config.analytics.id,
            router: Vue.$router,
            ecommerce: {
                enabled: true,
                enhanced: true
            }
        })
    } else {
        console.log('Ensure Google Analytics account ID is defined in config')
    }
}
