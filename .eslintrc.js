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
    'standard'
  ],
  plugins: ['vue', 'vue-storefront', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    // Preserve the former @typescript-eslint 1.x recommended policy without
    // enabling the substantially broader 3.x recommended ruleset.
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    '@typescript-eslint/array-type': 'error',
    '@typescript-eslint/ban-types': ['error', {
      extendDefaults: false,
      types: {
        String: { message: 'Use string instead', fixWith: 'string' },
        Boolean: { message: 'Use boolean instead', fixWith: 'boolean' },
        Number: { message: 'Use number instead', fixWith: 'number' },
        Object: { message: 'Use Record<string, any> instead', fixWith: 'Record<string, any>' },
        Symbol: { message: 'Use symbol instead', fixWith: 'symbol' }
      }
    }],
    camelcase: 'off',
    '@typescript-eslint/explicit-member-accessibility': 'error',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2],
    semi: 'off',
    '@typescript-eslint/semi': 0,
    '@typescript-eslint/member-delimiter-style': ['error', { 'multiline': { 'delimiter': 'comma', 'requireLast': false }, 'singleline': { 'delimiter': 'comma' } }],
    'no-array-constructor': 'off',
    '@typescript-eslint/no-array-constructor': 'error',
    '@typescript-eslint/no-empty-interface': 1,
    '@typescript-eslint/no-inferrable-types': 'error',
    '@typescript-eslint/no-misused-new': 'error',
    '@typescript-eslint/no-namespace': 'error',
    '@typescript-eslint/no-non-null-assertion': 'error',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 1,
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }],
    '@typescript-eslint/triple-slash-reference': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-parameter-properties': 0,
    '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
    '@typescript-eslint/prefer-namespace-keyword': 'error',
    '@typescript-eslint/type-annotation-spacing': 'error',
    '@typescript-eslint/naming-convention': [
      'warn',
      { selector: 'typeLike', format: ['PascalCase'] },
      { selector: 'interface', format: ['PascalCase'], custom: { regex: '^I[A-Z]', match: false } }
    ],
    'no-useless-constructor': 0,
    '@typescript-eslint/no-useless-constructor': 1,
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
      files: ['**/*.js'],
      rules: {
        '@typescript-eslint/explicit-member-accessibility': 'off'
      }
    },
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
