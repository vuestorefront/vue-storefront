import path from 'path';
import merge from 'webpack-merge';
import baseClientConfig from './webpack.client.config';
import serviceWorkerConfig from './webpack.prod.sw.config';
const themeRoot = require('./theme-path');

const extendedConfig = require(path.join(themeRoot, '/webpack.config.js'))

let prodClientConfig = merge(baseClientConfig, {
  mode: 'production',
  devtool: 'nosources-source-map',
  plugins: [
  ]
})

prodClientConfig = merge(prodClientConfig, serviceWorkerConfig)

export default extendedConfig(prodClientConfig, {
  isClient: true,
  isDev: false
})
