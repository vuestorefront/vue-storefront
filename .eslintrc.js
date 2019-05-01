module.exports = {
  root: true,
  env: { 'browser': true, 'jest': true },
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 8,
    sourceType: "module"
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: [
    'plugin:vue/recommended',
    'standard',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'prettier/@typescript-eslint',
    'prettier/vue'
  ],
  plugins: ['vue', 'vue-storefront', '@typescript-eslint'],
  // add your custom rules here
  rules: {
    // Prettier rules these rulles should never be hit, as prettier formattes the code so
    // so these will never get hit
    'no-tabs': 'error',
    quotes: [
      'error',
      'single',
      { avoidEscape: true, allowTemplateLiterals: true }
    ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always'
      }
    ],
    'array-bracket-spacing': ['error', 'never'],
    semi: ['error', 'always'],
    // disabled the rules because of line breaks that comes from prettier
    'standard/computed-property-even-spacing': 0,
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
    'no-restricted-imports': [2, { 'paths': ['lodash-es'] }],
    'vue-storefront/no-corecomponent-import': 'error',
    'vue-storefront/no-corecomponent': 'error',
    'vue-storefront/no-corepage-import': 'error',
    'vue-storefront/no-corepage': 'error'
  }
}
