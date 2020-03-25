const merge = require('webpack-merge')
const path = require('path')

const SpritesmithPlugin = require('webpack-spritesmith')

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
    const addCompiler = {
      resolve: {
        alias: {
          'vue$': 'vue/dist/vue.esm.js'
        }
      }
    }

    config = merge(config, addCompiler)
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
        /**
         * Minify CSS using postcss-clean
         */
        require('postcss-clean')({
          keepSpecialComments: 0
        }),
        /**
         * Remove unused CSS classes using PurgeCSS
         * @see https://tailwindcss.com/docs/controlling-file-size/#app
         * */
        ...process.env.NODE_ENV === 'production' ? [
          require('@fullhuman/postcss-purgecss')({
            content: [
              '!**/node_modules',
              './{src,core}/**/*.html',
              './{src,core}/**/*.vue'
            ],
            whitelistPatterns: [ /^t-bg-*/, /^t-text-*/, /^vue-slider-*/, /^t-border-alt-*/ ],
            whitelistPatternsChildren: [ /^service-carrier*/ ],
            defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || []
          })
        ] : [],
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

  config.module.rules.map(rewriteMapping)

  /**
   * Remove `data-test-id` attributes from DOM for production mode
   * @see https://forum.vuejs.org/t/how-to-remove-attributes-from-tags-inside-vue-components/24138/9
   */
  if (!isDev && !process.env.CI_TESTS) {
    config.module.rules.map(rule => {
      if (rule.loader === 'vue-loader') {
        rule.options.compilerOptions = {
          modules: [
            {
              preTransformNode (el) {
                const { attrsMap, attrsList } = el
                if (attrsMap['data-test-id']) {
                  delete attrsMap['data-test-id']
                  attrsList.splice(attrsList.findIndex(x => x.name === 'data-test-id'), 1)
                }
                return el
              }
            }
          ]
        }
      }

      return rule
    })
  }

  /**
   * Add css sprites for service logos
   */

  const sprites = {
    plugins: [
      new SpritesmithPlugin({
        src: {
          cwd: path.resolve(__dirname, 'assets/logos'),
          glob: '{shipping,payment}/*.png'
        },
        target: {
          image: path.resolve(__dirname, '../../../dist/logos/sprite-footer-logos.[hash].png'),
          css: path.resolve(__dirname, 'css/base/_sprite-footer-logos.scss')
        },
        retina: '@2x',
        apiOptions: {
          cssImageRef: '/dist/logos/sprite-footer-logos.[hash].png'
        },
        spritesmithOptions: {
          padding: 0,
          algorithm: 'top-down'
        }
      })
    ]
  }

  config = merge(config, sprites)

  return config
}
