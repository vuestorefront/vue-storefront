const path = require('path')
const config = require('config')
const fs = require('fs')

fs.writeFileSync(path.resolve(__dirname, './config.json'), JSON.stringify(config))

const vueConfig = require('./vue-loader.config')
const theme = require('./config.json').theme

const themeComponents = '../../src/themes/' + theme + '/components'
const themePages = '../../src/themes/' + theme + '/pages'
const themePlugins = '../../src/themes/' + theme + '/plugins'
const themeResources = '../../src/themes/' + theme + '/resource'
const themeCSS = '../../src/themes/' + theme + '/css'
const themeApp = '../../src/themes/' + theme + '/App.vue'

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './core/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      // Main aliases
      config: path.resolve(__dirname, './config.json'),
      lib: path.resolve(__dirname, '../../src/lib'), // DEPRECIATED, avoid using this in your themes, will be removed in 1.1
      'src': path.resolve(__dirname, '../../src'),
      'assets': path.resolve(__dirname, '../../src/assets'),
      'themes': path.resolve(__dirname, '../../src/themes/' + theme),
      // Core aliases
      'core/components': path.resolve(__dirname, '../components'),
      'components': path.resolve(__dirname, '../../src/components'),
      'core/pages': path.resolve(__dirname, '../pages'),
      'core/resource': path.resolve(__dirname, '../resource'),
      'core/plugins': path.resolve(__dirname, '../plugins'),
      'core/api': path.resolve(__dirname, '../api'),
      'core/lib': path.resolve(__dirname, '../lib'),
      'core/helpers': path.resolve(__dirname, '../helpers'),
      'core/filters': path.resolve(__dirname, '../filters'),
      'core/models': path.resolve(__dirname, '../models'),
      'core/router': path.resolve(__dirname, '../router'),
      'core/store': path.resolve(__dirname, '../store'),
      'core/mixins': path.resolve(__dirname, '../mixins'),
      'core/assets': path.resolve(__dirname, '../assets'),
      // Theme aliases
      'theme/resource': path.resolve(__dirname, themeResources),
      'theme/components': path.resolve(__dirname, themeComponents),
      'theme/pages': path.resolve(__dirname, themePages),
      'theme/plugins': path.resolve(__dirname, themePlugins),
      'theme/css': path.resolve(__dirname, themeCSS),
      'theme/app': path.resolve(__dirname, themeApp)
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
      }
    ]
  }
}
