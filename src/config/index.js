const Config = require('config')

const ConfigPlugin = {
  install (Vue) {
    if (!Vue.prototype.$config) {
      Object.defineProperties(Vue.prototype, {
        $config: {
          get: function () {
            return Config
          }
        }
      })
    }
  }
}

export { Config as default, ConfigPlugin }
