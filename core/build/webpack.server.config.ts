import webpack from 'webpack';
import merge from 'webpack-merge';
import base from './webpack.base.config';
import VueSSRPlugin from 'vue-ssr-webpack-plugin';

export default merge(base, {
  mode: 'development',
  target: 'node',
  entry: ['babel-polyfill', './core/server-entry.ts'],
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
