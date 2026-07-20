module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        'modules': false
      }
    ]
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs', 'babel-plugin-dynamic-import-node'],
      ignore: [/node_modules\/(?!lodash-es|@vue\/test-utils)/]
    }
  }
}
