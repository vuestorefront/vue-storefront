import path from 'path';

import baseServerConfig from './webpack.server.config';

import themeRoot from './theme-path';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

export default extendedConfig(baseServerConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  isClient: false,
  isDev: false
})
