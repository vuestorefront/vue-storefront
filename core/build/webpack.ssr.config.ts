import merge from 'webpack-merge';
import base from './webpack.base.config';
import nodeExternals from 'webpack-node-externals';

export default merge(base, {
  mode: 'development',
  target: 'node',
  entry: ['@babel/polyfill', './core/scripts/server.ts'],
  output: {
    filename: 'server.js'
  },
  externals: nodeExternals()
});
