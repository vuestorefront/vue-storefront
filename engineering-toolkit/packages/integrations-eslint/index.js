module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'airbnb-base',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error'],
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never'
      }
    ],
    'import/no-extraneous-dependencies': 'warn',
    'no-param-reassign': 'warn',
    'no-shadow': 'warn',
    'no-use-before-define': 'warn',
    camelcase: 'warn',
    'consistent-return': 'warn',
    'default-param-last': 'warn',
    'no-return-await': 'off',
    'no-throw-literal': 'warn',
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-constructor": "warn",
    "no-undef": "warn",
    "no-empty-function": "warn",
    "import/first": "warn",
    "no-empty": "warn",
    "import/no-dynamic-require": "warn"
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts']
      }
    }
  }
};
