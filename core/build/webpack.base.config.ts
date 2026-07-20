import { buildLocaleIgnorePattern } from './../i18n/helpers';
import path from 'path';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import webpack from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import dayjs from 'dayjs';
import { isDeprecationWarning, sassDeprecationsToSilence } from './deprecation-warnings';

// eslint-disable-next-line import/first
import themeRoot from './theme-path';

const themesRoot = '../../src/themes'
const themeResources = themeRoot + '/resource'
const themeCSS = themeRoot + '/css'
const themeApp = themeRoot + '/App.vue'

const postcssConfig = {
  loader: 'postcss-loader',
  options: {
    postcssOptions: {
      plugins: [
        require('autoprefixer')({
          flexbox: 'no-2009'
        })
      ]
    }
  }
};

const cssLoaderConfig = {
  loader: 'css-loader',
  options: {
    esModule: false,
    url: {
      filter: (url: string) => !url.startsWith('/')
    }
  }
}
const sassLoaderConfig = {
  loader: 'sass-loader',
  options: {
    sassOptions: {
      silenceDeprecations: sassDeprecationsToSilence
    }
  }
}
const progressPlugins = process.env.WEBPACK_PROGRESS === 'true'
  ? [new webpack.ProgressPlugin()]
  : []
// todo: usemultipage-webpack-plugin for multistore
const config: webpack.Configuration = {
  ignoreWarnings: [isDeprecationWarning],
  optimization: {
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false,
        terserOptions: {
          format: {
            comments: false
          }
        }
      })
    ]
  },
  plugins: [
    new webpack.ContextReplacementPlugin(/dayjs[/\\]locale$/, buildLocaleIgnorePattern()),
    ...progressPlugins,
    new VueLoaderPlugin(),
    new webpack.DefinePlugin({
      'process.env.BUILD': JSON.stringify('lib'),
      'process.env.__APPVERSION__': JSON.stringify(require('../../package.json').version),
      'process.env.__BUILDTIME__': JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'))
    })
  ],
  devtool: 'source-map',
  entry: {
    app: ['./core/client-entry.ts']
  },
  output: {
    publicPath: '/dist/',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[contenthash][ext]'
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
    extensions: ['.js', '.vue', '.ts'],
    alias: {
      // Main aliases
      'config': path.resolve(__dirname, './config.json'),
      'src': path.resolve(__dirname, '../../src'),

      // Theme aliases
      'theme': themeRoot,
      'theme/app': themeApp,
      'theme/css': themeCSS,
      'theme/resource': themeResources,

      // Backward compatible
      '@vue-storefront/core/lib/store/multistore': path.resolve(__dirname, '../lib/multistore.ts'),
      'src/modules/order-history/components/UserOrders': path.resolve(__dirname, '../../core/modules/order/components/UserOrdersHistory'),
      '@vue-storefront/core/modules/social-share/components/WebShare': path.resolve(__dirname, '../../src/themes/default/components/theme/WebShare.vue'),
      '@vue-storefront/core/helpers/initCacheStorage': path.resolve(__dirname, '../lib/storage-manager.ts')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.(js|cjs)$/,
        loader: 'babel-loader',
        include: [
          path.resolve(__dirname, '../../node_modules/@vue-storefront'),
          path.resolve(__dirname, '../../node_modules/@gtm-support/vue2-gtm'),
          path.resolve(__dirname, '../../node_modules/@gtm-support/core'),
          path.resolve(__dirname, '../../node_modules/@justinribeiro/lite-youtube'),
          path.resolve(__dirname, '../../node_modules/@googlemaps/js-api-loader'),
          path.resolve(__dirname, '../../src'),
          path.resolve(__dirname, '../../core')
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          cssLoaderConfig,
          postcssConfig
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          cssLoaderConfig,
          postcssConfig,
          sassLoaderConfig
        ]
      },
      {
        test: /\.sass$/,
        use: [
          'vue-style-loader',
          cssLoaderConfig,
          postcssConfig,
          sassLoaderConfig
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf)(\?.*$|$)/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10000
          }
        }
      },
      {
        test: /core\/build\/config\.json$/,
        loader: path.resolve('core/build/purge-config/purgeConfigLoader.ts')
      }
    ]
  }
}

export default config
