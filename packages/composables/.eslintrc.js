module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/prettier',
    '@vue/typescript'
  ],
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}