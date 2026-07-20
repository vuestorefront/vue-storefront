import path from 'path'
import webpack from 'webpack'
import { merge } from 'webpack-merge'
import base from './webpack.base.config'

const config = merge<webpack.Configuration>(base, {
  mode: 'production',
  devtool: false,
  stats: {
    modules: false
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, '../../dist/client'),
    filename: 'core-service-worker.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"client"'
    })
  ]
})

config.entry = ['./core/service-worker/index.js']

export default config
