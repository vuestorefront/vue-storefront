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
          // create 'vendor' group from initial packages from node_modules
          test: /node_modules/,
          name: 'vendor',
          chunks: 'initial',
          priority: 1
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
