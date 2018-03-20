const path = require('path')
const config = require('config')
const fs = require('fs')


fs.writeFileSync(
  path.resolve(__dirname, './config.json'),
  JSON.stringify(config)
)

const vueConfig = require('./vue-loader.config')
const appConfig = require('./config.json')

const extensionsRoot = '../../src/extensions'
const themesRoot = '../../src/themes'

const themeRoot = require('./theme-path')
const themeComponents = themeRoot + '/components'
const themePages = themeRoot + '/pages'
const themePlugins = themeRoot + '/plugins'
const themeFilters = themeRoot + '/filters'
const themeMixins = themeRoot + '/mixins'
const themeResources = themeRoot + '/resource'
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './core/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
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
    extensions: ['.js', '.vue'],
    alias: {
      // Main aliases
      'config': path.resolve(__dirname, './config.json'),
      'core': path.resolve(__dirname, '../'),
      'lib': path.resolve(__dirname, '../../src/lib'), // DEPRECIATED, avoid using this in your themes, will be removed in 1.1
      'src': path.resolve(__dirname, '../../src'),
      // Core aliases
      'components': path.resolve(__dirname, '../../src/components'),
      'core/api': path.resolve(__dirname, '../api'),
      'core/assets': path.resolve(__dirname, '../assets'),
      'core/components': path.resolve(__dirname, '../components'),
      'core/filters': path.resolve(__dirname, '../filters'),
      'core/helpers': path.resolve(__dirname, '../helpers'),
      'core/lib': path.resolve(__dirname, '../lib'),
      'core/mixins': path.resolve(__dirname, '../mixins'),
      'core/models': path.resolve(__dirname, '../models'),
      'core/pages': path.resolve(__dirname, '../pages'),
      'core/plugins': path.resolve(__dirname, '../plugins'),
      'core/resource': path.resolve(__dirname, '../resource'),
      'core/router': path.resolve(__dirname, '../router'),
      'core/store': path.resolve(__dirname, '../store'),
      // Theme aliases
      'theme': themeRoot,
      'theme/app': themeApp,
      'theme/components': themeComponents,
      'theme/css': themeCSS,
      'theme/filters': themeFilters,
      'theme/mixins': themeMixins,
      'theme/pages': themePages,
      'theme/plugins': themePlugins,
      'theme/resource': themeResources
    }
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js'
  },
  module: {
    rules: [{
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueConfig,
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.s[a|c]ss$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.md$/,
        loader: 'vue-markdown-loader',
        options: {
          wrapper: 'div'
        }
      },
      {
        test: path.resolve(__dirname, '../lib/translation.preprocessor.js'),
        use: [
          { loader: 'json-loader' },
          {
            loader: 'val-loader',
            options: {
              csvDirectories: [
                path.resolve(__dirname, '../resource/i18n/'),
                path.resolve(__dirname, themeResources + '/i18n/')
              ]
            }
          }
        ]
      }
    ]
  }
}
