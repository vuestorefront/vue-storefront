// Webpack config used to build VS modules
module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  output: {
    libraryTarget: 'umd',
    globalObject: 'typeof self !== \'undefined\' ? self : this'
  },
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      { 
        test: /\.ts$/,
        use: ['ts-loader'], 
        options: {
          transpileOnly: true
        }, 
        exclude: /node_modules/ 
      }
    ]
  },
  externals: ['@vue-storefront/core']
}
