// You can extend default webpack build here. Read more on docs: https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
module.exports = function (config, { isClient, isDev }) {
  /**
   * Add Vue.js library with compiler to compile components in runtime
   * @see https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
   */
  if (isClient) {
    Object.assign(config.default.resolve.alias, {
      'vue$': 'vue/dist/vue.esm.js'
    })
  }

  return config
}
