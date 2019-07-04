module.exports = {
  entry: './src/index.ts',
  resolve: {
    extensions: ['.ts', '.js', '.json']
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ }
    ]
  }
}
