import path from 'path';
import merge from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
const themeRoot = require('./theme-path');

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
  ]
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
