const path = require('path')
const config = require('config')
const fs = require('fs')

fs.writeFileSync(path.resolve(__dirname, '../build/config.json'), JSON.stringify(config))

const vueConfig = require('./vue-loader.config')

const theme = require('../build/config.json').theme
const themeComponents = '../src/themes/' + theme + '/components'
const themePages = '../src/themes/' + theme + '/pages'
const themePlugins = '../src/themes/' + theme + '/plugins'
const themeResources = '../src/themes/' + theme + '/resource'
const themeCSS = '../src/themes/' + theme + '/css'
const themeApp = '../src/themes/' + theme + '/App.vue'

module.exports = {
  devtool: '#source-map',
  entry: {
    app: './src/client-entry.js',
    vendor: ['vue', 'vue-router', 'vuex', 'vuex-router-sync', 'axios']
  },
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.vue'],
    alias: {
      config: path.resolve(__dirname, '../build/config.json'),
      core_pages: path.resolve(__dirname, '../src/pages'),
      core_components: path.resolve(__dirname, '../core/components'),
      core_stores: path.resolve(__dirname, '../src/store'),
      core_themes: path.resolve(__dirname, '../src/themes/' + theme),
      'core/components': path.resolve(__dirname, '../core/components'),
      'core/resource': path.resolve(__dirname, '../core/resource'),
      'components': path.resolve(__dirname, '../src/components'),
      'core/pages': path.resolve(__dirname, '../src/pages'),
      'core/resource': path.resolve(__dirname, '../src/resource'),
      'core/plugins': path.resolve(__dirname, '../src/plugins'),
      'core/api': path.resolve(__dirname, '../core/api'),
      
      lib: path.resolve(__dirname, '../src/lib'),

      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),
      'resources': path.resolve(__dirname, '../src/resource'),

      theme_pages: path.resolve(__dirname, themePages),
      theme_components: path.resolve(__dirname, themeComponents),
      'theme/resource': path.resolve(__dirname, themeResources),
      'theme/components': path.resolve(__dirname, themeComponents),
      'theme/pages': path.resolve(__dirname, themePages),
      'theme/plugins': path.resolve(__dirname, themePlugins),
      'theme/css': path.resolve(__dirname, themeCSS),
      'theme/app': path.resolve(__dirname, themeApp)
    }
  },

  output: {
    path: path.resolve(__dirname, '../dist'),
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
