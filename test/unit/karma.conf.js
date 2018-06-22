const baseConfig = require('../../core/build/webpack.base.config.js')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const webpackConfig = Object.assign({}, baseConfig, {
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"test"'
    }),
    new VueLoaderPlugin()
  ]
})

// no need for app entry during tests
delete webpackConfig.entry

module.exports = function (config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  })
}
