module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': false
      }
    ]
  ],
  plugins: ['@babel/plugin-syntax-dynamic-import'],
  env: {
    test: {
      plugins: ['transform-es2015-modules-commonjs'],
      ignore: [/node_modules\/(?!lodash-es|@vue\/test-utils)/]
    }
  }
}
