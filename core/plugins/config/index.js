import config from 'config'

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
