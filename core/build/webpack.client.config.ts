import webpack from 'webpack'
import merge from 'webpack-merge'
import base from './webpack.base.config'
import VueSSRClientPlugin from 'vue-server-renderer/client-plugin'
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const config = merge(base, {
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/](vue|vuex|vue-router|vue-meta|vue-i18n|vuex-router-sync|localforage|lean-he|vue-lazyload|js-sha3|dayjs|core-js|whatwg-fetch|vuelidate)[\\/]/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  mode: 'development',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

export default config;
