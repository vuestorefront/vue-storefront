const path = require('path');

/**
 * You can extend default webpack build here.
 * @see https://github.com/DivanteLtd/vue-storefront/blob/master/doc/Working%20with%20webpack.md
*/
module.exports = function (config, { isClient, isDev }) {
  /**
   * Add Vue.js library with compiler to compile components in runtime
   * @see https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
   */
  if (isClient) {
    Object.assign(isDev ? config.default.resolve.alias : config.resolve.alias, {
      'vue$': 'vue/dist/vue.esm.js'
    })
  }

  /**
   * Inject postcss plugin for Tailwind.css to original webpack config.
   *
   * You could also just change the following constant
   * of the original file "core/build/webpack.base.config.ts" like:
   *
   * const postcssConfig = {
   *   loader: 'postcss-loader',
   *   options: {
   *     ident: 'postcss',
   *     plugins: (loader) => [
   *       require('postcss-flexbugs-fixes'),
   *       require('tailwindcss')(path.join(themeRoot, 'tailwind.js')),
   *       require('autoprefixer')({
   *         flexbox: 'no-2009'
   *       })
   *     ]
   *   }
   * };
   */
  const rewriteMapping = rule => {
    if (rule.hasOwnProperty('use')) {
      rule.use = rule.use.map(item => {
        if (typeof item === 'object' &&
          item.hasOwnProperty('loader') &&
          item.loader === 'postcss-loader' &&
          item.hasOwnProperty('options')
        ) {
          const plugins = (typeof item.options.plugins === 'function') ? item.options.plugins() : item.options.plugins
          if (typeof plugins === 'object') {
            plugins.unshift(
              require('tailwindcss')(path.join(__dirname, 'tailwind.js'))
            )

            item.options.plugins = plugins
          }
        }

        return item
      })
    }

    return rule
  }

  if (isDev) {
    config.default.module.rules = config.default.module.rules.map(rewriteMapping)
  } else {
    config.module.rules = config.module.rules.map(rewriteMapping)
  }

  return config
}
