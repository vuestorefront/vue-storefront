import path from 'path';

import baseServerConfig from './webpack.server.config';

import themeRoot from './theme-path';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

export default extendedConfig(baseServerConfig, {
  mode: 'production',
  isClient: false,
  isDev: false
})
