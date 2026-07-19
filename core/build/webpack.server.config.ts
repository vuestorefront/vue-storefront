import webpack from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.base.config';
import VueSSRPlugin from 'vue-ssr-webpack-plugin';

// when output cache is enabled generate cache version key
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const bundledServerDependencies = [
  '@storefront-ui/vue',
  '@gtm-support/vue2-gtm',
  '@gtm-support/core'
]

fs.writeFileSync(
  path.join(__dirname, 'cache-version.json'),
  JSON.stringify(uuidv4())
)

export default merge(base, {
  mode: 'development',
  target: 'node',
  entry: ['./core/server-entry.ts'],
  output: {
    path: path.resolve(__dirname, '../../dist/server'),
    filename: 'server-bundle.js',
    libraryTarget: 'commonjs2'
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js'
    }
  },
  externals: Object.keys(require('../../package.json').dependencies)
    .filter((dependencyName) => !bundledServerDependencies.includes(dependencyName)),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    new VueSSRPlugin()
  ]
})
