const path = require('path')
const config = require('config')
const fs = require('fs')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const autoprefixer = require('autoprefixer')

fs.writeFileSync(
  path.resolve(__dirname, './config.json'),
  JSON.stringify(config)
)

const extensionsRoot = '../src/extensions'
const themesRoot = '../src/themes'

const themeRoot = require('./theme-path')
const themeComponents = themeRoot + '/components'
const themeExtensions = themeRoot + '/extensions'
const themePages = themeRoot + '/pages'
const themePlugins = themeRoot + '/plugins'
const themeFilters = themeRoot + '/filters'
const themeMixins = themeRoot + '/mixins'
const themeResources = themeRoot + '/resource'
const themeStores = themeRoot + '/store'
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'

const translationPreprocessor = require('./translation.preprocessor.js')
translationPreprocessor([
  path.resolve(__dirname, '../src/core/resource/i18n/'),
  path.resolve(__dirname, themeResources + '/i18n/')
])

const postcssConfig =  {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        flexbox: 'no-2009',
      }),
    ]
  }
};

module.exports = {
  plugins: [
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin()
  ],
  devtool: 'source-map',
  entry: {
    app: './src/client-entry.js'
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, extensionsRoot),
      path.resolve(__dirname, themesRoot)
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, extensionsRoot),
      path.resolve(__dirname, themesRoot)
    ],
    extensions: ['.js', '.vue', '.ts'],
    alias: {
      // Main aliases
      'config': path.resolve(__dirname, './config.json'),
      'core': path.resolve(__dirname, '../src/core'),
      'lib': path.resolve(__dirname, '../src/lib'), // DEPRECIATED, avoid using this in your themes, will be removed in 1.1
      'src': path.resolve(__dirname, '../src'),
      // Core aliases
      'components': path.resolve(__dirname, '../src/components'),
      'core/api': path.resolve(__dirname, '../src/core/api'),
      'core/assets': path.resolve(__dirname, '../src/core/assets'),
      'core/components': path.resolve(__dirname, '../src/core/components'),
      'core/filters': path.resolve(__dirname, '../src/core/filters'),
      'core/helpers': path.resolve(__dirname, '../src/core/helpers'),
      'core/lib': path.resolve(__dirname, '../src/core/lib'),
      'core/mixins': path.resolve(__dirname, '../src/core/mixins'),
      'core/models': path.resolve(__dirname, '../src/core/models'),
      'core/pages': path.resolve(__dirname, '../src/core/pages'),
      'core/plugins': path.resolve(__dirname, '../src/core/plugins'),
      'core/resource': path.resolve(__dirname, '../src/core/resource'),
      'core/router': path.resolve(__dirname, '../src/core/router'),
      'core/directives': path.resolve(__dirname, '../src/core/directives'),
      // Ccre API Modules
      'core/api/cart': path.resolve(__dirname, '../src/core/api/cart/index.js'),
      // Theme aliases
      'theme': themeRoot,
      'theme/app': themeApp,
      'theme/components': themeComponents,
      'theme/css': themeCSS,
      'theme/filters': themeFilters,
      'theme/mixins': themeMixins,
      'theme/pages': themePages,
      'theme/plugins': themePlugins,
      'theme/resource': themeResources,
      'theme/store': themeStores,
      'theme/extensions': themeExtensions
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /test/]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          optimizeSSR: false,
          preserveWhitespace: false,
          postcss: [autoprefixer()],
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['@vue-storefront']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
          postcssConfig
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          postcssConfig,
          'sass-loader'
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          'css-loader',
          postcssConfig,
          {
            loader: 'sass-loader',
            options: {
              indentedSyntax: true
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: [
          'vue-loader',
          {
            loader: 'markdown-to-vue-loader',
            options: {
              componentWrapper: 'div'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=10000'
      }
    ]
  }
}
