import webpack from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.base.config';
import VueSSRPlugin from 'vue-ssr-webpack-plugin';

// when output cache is enabled generate cache version key
import config from 'config'
import fs from 'fs'
import path from 'path'
import uuid from 'uuid/v4'

if (config.server.useOutputCache) {
  fs.writeFileSync(
    path.join(__dirname, 'cache-version.json'),
    JSON.stringify(uuid())
  )
}

export default merge(base, {
  mode: 'development',
  target: 'node',
  entry: ['@babel/polyfill', './core/server-entry.ts'],
  output: {
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: Object.keys(require('../../package.json').dependencies),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
