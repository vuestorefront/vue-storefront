const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const path = require('path')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

const config = merge(base, {
  optimization: {
    splitChunks:  {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'all',
        },
      },
    },    
    runtimeChunk: {
      name: "manifest",
    }
  },
  mode: 'development',
  resolve: {
    alias: {
      'create-api': './create-api-client.js'
    }
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    }),
    new VueSSRClientPlugin()
  ]
})

module.exports = config;
