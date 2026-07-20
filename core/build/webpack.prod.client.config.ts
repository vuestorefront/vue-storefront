import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
const themeRoot = require('./theme-path');

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodClientConfig = merge<webpack.Configuration>(baseClientConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  stats: {
    modules: false
  }
})

module.exports = extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
