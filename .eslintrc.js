module.exports = {
  root: true,
  env: { browser: true, jest: true },
  globals: { fetchMock: true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 8,
    sourceType: 'module'
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended'
  ],
  plugins: ['vue', 'vue-storefront', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    '@typescript-eslint/no-var-requires': 1,
    '@typescript-eslint/indent': ['error', 2],
    '@typescript-eslint/camelcase': 0,
    semi: 'off',
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'comma', 'requireLast': false }, 'singleline': { 'delimiter': 'comma' } }],
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/class-name-casing': 1,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    'handle-callback-err': 1,
    'prefer-promise-reject-errors': 0,
    'import/no-duplicates': 1,
    'vue/return-in-computed-property': 1,
    'vue/no-use-v-if-with-v-for': 0,
    'vue/no-unused-components': 1,
    'vue/no-v-html': 0,
    'vue/no-template-shadow': 2,
    /* max attributes-per-line and order-in-components
     ** we should use this later, when eslint-plugin-vue will support auto fixing this
     */
    'vue/max-attributes-per-line': 0,
    'vue/order-in-components': 0,
    'vue/attributes-order': 0,
    // less restricted v-for -> v-if rules
    'vue/no-confusing-v-for-v-if': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    'prefer-arrow-callback': 1,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-restricted-imports': [2, { paths: ['lodash-es'] }],
    'vue-storefront/no-corecomponent-import': 'error',
    'vue-storefront/no-corecomponent': 'error',
    'vue-storefront/no-corepage-import': 'error',
    'vue-storefront/no-corepage': 'error'
  },
  overrides: [
    {
      // @todo check if this is closed https://github.com/typescript-eslint/typescript-eslint/issues/342
      // This is an issue with interfaces so we need to wait until it fixed.
      files: ['core/**/*.ts'],
      rules: {
        'no-undef': 1
      }
    }
  ]
};
