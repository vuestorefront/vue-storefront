import store from '@vue-storefront/core/store'
const config = store.state.config
// deprecated, use vuex store instead
const ConfigPlugin = {
  install (Vue) {
    if (!Vue.prototype.$config) {
      Object.defineProperties(Vue.prototype, {
        $config: {
          get: function () {
            return config
          }
        }
      })
    }
  }
}

export { config as default, ConfigPlugin }
