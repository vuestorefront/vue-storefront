module.exports = {
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    '@vue/typescript'
  ],
  overrides: [
    {
      files: ['*.spec.ts', '*.spec.js'],
      env: {
        jest: true
      }
    },
    {
      files: ['packages/core/theme-module/index.js', '**/*.config.js'],
      env: {
        node: true
      }
    }
  ]
}
