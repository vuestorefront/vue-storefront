import path from 'path';
import baseSsrConfig from './webpack.ssr.config';
import themeRoot from './theme-path';

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'));

export default extendedConfig(baseSsrConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  isClient: false,
  isDev: false
});
