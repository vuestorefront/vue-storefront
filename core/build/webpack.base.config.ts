import path from 'path';
import config from 'config';
import fs from 'fs';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import autoprefixer from 'autoprefixer';
import HTMLPlugin from 'html-webpack-plugin';
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
import webpack from 'webpack';
import dayjs from 'dayjs';

fs.writeFileSync(
  path.resolve(__dirname, './config.json'),
  JSON.stringify(config)
)

// eslint-disable-next-line import/first
import themeRoot from './theme-path';
config.themeRoot = themeRoot;

// TODOed: make it customizable via node env or something else that will be suitable once we have core separation
// const projectRoot = '../../src'
const projectRoot = path.resolve(process.env.BASE_PATH || process.cwd());
config.projectRoot = projectRoot;

const themesRoot = projectRoot + '/themes'

const themeResources = themeRoot + '/resource'
console.log(themeResources)
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'
const themedIndex = path.join(themeRoot, '/templates/index.template.html')
const themedIndexMinimal = path.join(themeRoot, '/templates/index.minimal.template.html')
const themedIndexBasic = path.join(themeRoot, '/templates/index.basic.template.html')
const themedIndexAmp = path.join(themeRoot, '/templates/index.amp.template.html')

const translationPreprocessor = require('../i18n/scripts/translation.preprocessor.js')
translationPreprocessor([
  path.resolve(__dirname, '../i18n/resource/i18n/'),
  path.resolve(__dirname, themeResources + '/i18n/')
], config)

const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        flexbox: 'no-2009'
      })
    ]
  }
};
const isProd = process.env.NODE_ENV === 'production'
// todo: usemultipage-webpack-plugin for multistore

export default {
  node: {
    fs: 'empty'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    // new BundleAnalyzerPlugin({
    //   generateStatsFile: true
    // }),
    new CaseSensitivePathsPlugin(),
    new VueLoaderPlugin(),
    // generate output HTML
    new HTMLPlugin({
      template: fs.existsSync(themedIndex) ? themedIndex : 'src/index.template.html',
      filename: 'index.html',
      chunksSortMode: 'none',
      inject: isProd === false // in dev mode we're not using clientManifest therefore renderScripts() is returning empty string and we need to inject scripts using HTMLPlugin
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexMinimal) ? themedIndexMinimal : 'src/index.minimal.template.html',
      filename: 'index.minimal.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexBasic) ? themedIndexBasic : 'src/index.basic.template.html',
      filename: 'index.basic.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new HTMLPlugin({
      template: fs.existsSync(themedIndexAmp) ? themedIndexAmp : 'src/index.amp.template.html',
      filename: 'index.amp.html',
      chunksSortMode: 'none',
      inject: isProd === false
    }),
    new webpack.DefinePlugin({
      'process.env.__APPVERSION__': JSON.stringify(require(config.projectRoot + '/package.json').version),
      'process.env.__BUILDTIME__': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    })
  ],
  devtool: 'source-map',
  entry: {
    app: ['@babel/polyfill', '@vue-storefront/core/client-entry.ts']
  },
  output: {
    path: path.resolve(__dirname, '../../dist'),
    publicPath: '/dist/',
    filename: '[name].[hash].js'
  },
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, themesRoot)
    ]
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, themesRoot)
    ],
    extensions: ['.js', '.vue', '.gql', '.graphqls', '.ts'],
    alias: {
      // Main aliases
      'config': path.resolve(__dirname, './config.json'),
      'src': path.resolve(__dirname, config.projectRoot + '/src'),
      '@vue-storefront/core/helpers': path.resolve(__dirname, '../helpers'),
      '@vue-storefront/core/modules': path.resolve(__dirname, '../modules'),
      '@vue-storefront/core/lib': path.resolve(__dirname, '../lib'),
      '@vue-storefront/core/lib/modules': path.resolve(__dirname, '../lib/modules.ts'),
      '@vue-storefront/core/types': path.resolve(__dirname, '../types'),
      '@vue-storefront/core/store': path.resolve(__dirname, '../store'),
      '@vue-storefront/core/filters': path.resolve(__dirname, '../filters'),
      '@vue-storefront/core/compatibility': path.resolve(__dirname, '../compatibility'),
      '@vue-storefront/core/hooks': path.resolve(__dirname, '../hooks.ts'),
      '@vue-storefront/core/data-resolver': path.resolve(__dirname, '../data-resolver'),
      '@vue-storefront/core/data-resolver/types': path.resolve(__dirname, '../data-resolver/types'),
      '@vue-storefront/core/mixins': path.resolve(__dirname, '../mixins'),
      '@vue-storefront/core/app': path.resolve(__dirname, '../app.ts'),
      '@vue-storefront/i18n': path.resolve(__dirname, '../i18n'),
      '@vue-storefront/core/service-worker': path.resolve(__dirname, '../service-worker'),
      '@vue-storefront/core/i18n': path.resolve(__dirname, '../i18n'),
      '@vue-storefront/core/i18n/resource/countries.json': path.resolve(__dirname, '../i18n/resource/countries.json'),

      // Theme aliases
      // 'theme/index.ts': themeRoot + '/index.ts',
      'theme': themeRoot,
      'theme/app': themeApp,
      'theme/css': themeCSS,
      'theme/resource': themeResources,
      // Backward compatible
      '@vue-storefront/core/store/lib/multistore': path.resolve(__dirname, '../lib/multistore.ts'),
      'src/modules/order-history/components/UserOrders': path.resolve(__dirname, '../../core/modules/order/components/UserOrdersHistory'),
      '@vue-storefront/core/modules/social-share/components/WebShare': path.resolve(__dirname, '../../src/themes/default/components/theme/WebShare.vue'),
      '@vue-storefront/core/helpers/initCacheStorage': path.resolve(__dirname, '../lib/storage-manager.ts')
    }
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|vue,ts)$/,
        loader: 'eslint-loader',
        exclude: [/node_modules/, /test/]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false,
          postcss: [autoprefixer()]
        }
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        },
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../../node_modules/@vue-storefront'),
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../core')
        ]
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
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        loader: 'url-loader?importLoaders=1&limit=10000'
      },
      {
        test: /\.(graphqls|gql)$/,
        exclude: /node_modules/,
        loader: ['graphql-tag/loader']
      }
    ]
  }
}
