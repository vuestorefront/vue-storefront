import { ConfigManager } from '@vue-storefront/core/lib/config-manager'
const config = ConfigManager.getConfig()
// deprecated, use vuex store instead
const ConfigPlugin = {
  install (Vue) {
    if (!Vue.prototype.$config) {
      Object.defineProperties(Vue.prototype, {
        $config: {
          get: function () {
            return ConfigManager.getConfig()
          }
        }
      })
    }
  }
}

export { config as default, ConfigPlugin }
