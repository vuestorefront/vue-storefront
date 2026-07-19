import path from 'path';
import merge from 'webpack-merge';

import baseServerConfig from './webpack.server.config';

import themeRoot from './theme-path';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

const prodServerConfig = merge(baseServerConfig, {
  mode: 'production',
  devtool: false
})

export default extendedConfig(prodServerConfig, {
  isClient: false,
  isDev: false
})
