const path = require('path')
// TO-DO: FIgure out why critical css doesn't work with SSR 
// const CriticalPlugin = require('webpack-plugin-critical').CriticalPlugin;

// const projectRoot = path.resolve(__dirname, '../')
const vueConfig = require('./vue-loader.config')

const theme = require('../src/config.json').theme
const themeComponents = '../src/themes/' + theme +'/components'
const themePages = '../src/themes/' + theme +'/pages'
const themeCSS = '../src/themes/' + theme +'/css'
const themeApp = '../src/themes/' + theme +'/App.vue'

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
      'config': path.resolve(__dirname, '../config.json'),
      core_pages: path.resolve(__dirname, '../src/pages'),
      core_components: path.resolve(__dirname, '../src/components'),
      core_stores: path.resolve(__dirname, '../src/store'),
      core_themes: path.resolve(__dirname, '../src/themes'),
      'core/components': path.resolve(__dirname, '../src/components/core'),
      'components': path.resolve(__dirname, '../src/components'),
      'core/pages': path.resolve(__dirname, '../src/pages'),

      lib: path.resolve(__dirname, '../src/lib'),

      'src': path.resolve(__dirname, '../src'),
      'assets': path.resolve(__dirname, '../src/assets'),

      theme_pages: path.resolve(__dirname, themePages),
      theme_components: path.resolve(__dirname, themeComponents),
      'theme/components': path.resolve(__dirname, themeComponents),
      'theme/pages': path.resolve(__dirname, themePages),
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
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        enforce: 'pre',
        test: /\.vue$/,
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
        loader: 'style!css!sass',
        
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
  // plugins: [
  //   new CriticalPlugin({
  //     base: path.join(path.resolve(__dirname)),
      
  //     src: '../src/index.template.html',
  //     inline: true,
  //     minify: true,
  //     dest: 'index.html'
  //   })
  // ]
}
