import webpack from 'webpack';
import { merge } from 'webpack-merge';
import base from './webpack.base.config';
import VueSSRPlugin from 'vue-server-renderer/server-plugin';
import path from 'path'

const bundledServerDependencies = [
  '@storefront-ui/vue',
  '@gtm-support/vue2-gtm',
  '@gtm-support/core'
]

export default merge<webpack.Configuration>(base, {
  mode: 'development',
  target: 'node',
  entry: ['./core/server-entry.ts'],
  output: {
    path: path.resolve(__dirname, '../../dist/server'),
    filename: 'server-bundle.js',
    library: {
      type: 'commonjs2'
    }
  },
  resolve: {
    alias: {
      'create-api': './create-api-server.js',
      '@vue-storefront/core/lib/fetch$': path.resolve(__dirname, '../lib/fetch/server.ts')
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
