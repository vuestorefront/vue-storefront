import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';

import baseServerConfig from './webpack.server.config';

import themeRoot from './theme-path';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodServerConfig = merge<webpack.Configuration>(baseServerConfig, {
  mode: 'production',
  devtool: false,
  stats: {
    modules: false
  }
})

export default extendedConfig(prodServerConfig, {
  isClient: false,
  isDev: false
})
