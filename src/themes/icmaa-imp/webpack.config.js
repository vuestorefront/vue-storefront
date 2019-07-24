const merge = require('webpack-merge')
const path = require('path')

/**
 * You can extend default webpack build here.
 * @see https://docs.vuestorefront.io/guide/core-themes/webpack.html
*/
module.exports = function (config, { isClient, isDev }) {
  /**
   * Add Vue.js library with compiler to compile components in runtime
   * @see https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
   */
  if (isClient) {
    config = merge(config, {
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    })
  }

  /**
   * Inject postcss plugin for Tailwind.css to original webpack config.
   * Change the postcssConfig of the postcss-loader and add our loader plugin.
   *
   * You could also just change the following constant
   * of the original file "core/build/webpack.base.config.ts"
   */
  const postcssConfig = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: (loader) => [
        require('tailwindcss')(path.join(__dirname, 'tailwind.js')),
        require('postcss-flexbugs-fixes'),
        require('autoprefixer')({
          flexbox: 'no-2009'
        })
      ]
    }
  };

  const rewriteMapping = (rule) => {
    if (/(css|scss|sass)/.exec(rule.test)) {
      rule.use = rule.use.map(
        plugin => (plugin.loader && plugin.loader === 'postcss-loader') ? postcssConfig : plugin
      )
    }

    return rule
  }

  let rules = (isDev) ? config.default.module.rules : config.module.rules
  rules.map(rewriteMapping)

  return config
}
