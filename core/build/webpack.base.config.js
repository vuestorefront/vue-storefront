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

const extensionsRoot = '../../src/extensions'
const themesRoot = '../../src/themes'

const themeRoot = require('./theme-path')
const themeResources = themeRoot + '/resource'
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'

const translationPreprocessor = require('../lib/translation.preprocessor.js')
translationPreprocessor([
  path.resolve(__dirname, '../resource/i18n/'),
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
    app: './core/client-entry.ts'
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
      'core': path.resolve(__dirname, '../'),
      'lib': path.resolve(__dirname, '../../src/lib'), // DEPRECIATED, avoid using this in your themes, will be removed in 1.1
      'src': path.resolve(__dirname, '../../src'),
      // Core aliases
      'components': path.resolve(__dirname, '../../src/components'),
      // Ccre API Modules
      'core/api/cart': path.resolve(__dirname, '../api/cart/index.js'),
      // Theme aliases
      'theme': themeRoot,
      'theme/app': themeApp,
      'theme/css': themeCSS,
      'theme/resource': themeResources
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
