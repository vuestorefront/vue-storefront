const js = require('@eslint/js')
const typescriptEslint = require('@typescript-eslint/eslint-plugin')
const typescriptParser = require('@typescript-eslint/parser')
const importPlugin = require('eslint-plugin-import')
const nodePlugin = require('eslint-plugin-n')
const promisePlugin = require('eslint-plugin-promise')
const vuePlugin = require('eslint-plugin-vue')
const vueParser = require('vue-eslint-parser')
const vueStorefrontPlugin = require('eslint-plugin-vue-storefront')
const globals = require('globals')

const normalizedVueStorefrontPlugin = {
  ...vueStorefrontPlugin,
  rules: Object.fromEntries(
    Object.entries(vueStorefrontPlugin.rules).map(([ruleName, rule]) => [
      ruleName,
      typeof rule === 'function' ? { create: rule } : rule
    ])
  )
}

module.exports = [
  {
    ignores: [
      'core/build/*.js',
      'node_modules/**',
      'packages/module/*.js'
    ]
  },
  js.configs.recommended,
  ...vuePlugin.configs['flat/vue2-recommended'],
  {
    files: ['**/*.{js,ts,vue}'],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        ecmaVersion: 2020,
        sourceType: 'module'
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.jest,
        fetchMock: 'readonly'
      }
    },
    plugins: {
      '@typescript-eslint': typescriptEslint,
      import: importPlugin,
      n: nodePlugin,
      promise: promisePlugin,
      'vue-storefront': normalizedVueStorefrontPlugin
    },
    rules: {
      '@typescript-eslint/adjacent-overload-signatures': 'error',
      '@typescript-eslint/array-type': 'error',
      '@typescript-eslint/no-wrapper-object-types': 'error',
      '@typescript-eslint/explicit-member-accessibility': 'error',
      'no-array-constructor': 'off',
      '@typescript-eslint/no-array-constructor': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-namespace': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': 'warn',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/consistent-type-assertions': ['error', { assertionStyle: 'as', objectLiteralTypeAssertions: 'never' }],
      '@typescript-eslint/triple-slash-reference': 'error',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
      '@typescript-eslint/prefer-namespace-keyword': 'error',
      '@typescript-eslint/naming-convention': [
        'warn',
        { selector: 'typeLike', format: ['PascalCase'] }
      ],
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-useless-constructor': 'warn',
      'n/no-deprecated-api': 'error',
      'promise/param-names': 'error',
      'handle-callback-err': 'warn',
      'prefer-promise-reject-errors': 'off',
      'import/export': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'warn',
      'import/no-named-default': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'vue/return-in-computed-property': 'warn',
      'vue/no-use-v-if-with-v-for': 'off',
      'vue/no-unused-components': 'warn',
      'vue/no-v-html': 'off',
      'vue/no-template-shadow': 'error',
      'vue/max-attributes-per-line': 'off',
      'vue/order-in-components': 'off',
      'vue/attributes-order': 'off',
      'prefer-arrow-callback': 'warn',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-prototype-builtins': 'off',
      'no-restricted-imports': ['error', { paths: ['lodash-es'] }],
      'vue/multi-word-component-names': 'off',
      'vue-storefront/no-corecomponent-import': 'error',
      'vue-storefront/no-corecomponent': 'error',
      'vue-storefront/no-corepage-import': 'error',
      'vue-storefront/no-corepage': 'error'
    }
  },
  {
    files: ['**/*.js'],
    rules: {
      '@typescript-eslint/explicit-member-accessibility': 'off'
    }
  },
  {
    files: ['**/*.{ts,vue}'],
    rules: {
      'no-undef': 'off'
    }
  },
  {
    files: ['core/**/*.ts'],
    rules: {
      'no-undef': 'off'
    }
  }
]
