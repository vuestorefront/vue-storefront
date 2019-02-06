import path from 'path';
import merge from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
const themeRoot = require ('./theme-path');
import CompressionPlugin from 'compression-webpack-plugin';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  plugins: [
    new CompressionPlugin({
      test: /\.js(\?.*)?$/i,
      deleteOriginalAssets: true
    })
  ]
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
