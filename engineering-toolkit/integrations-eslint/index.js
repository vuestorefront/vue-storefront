module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/ban-types": "warn",
    "no-underscore-dangle": "off",
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        ts: "never",
      },
    ],
    "import/no-extraneous-dependencies": "warn",
    "@typescript-eslint/no-non-null-assertion": "warn",
    "no-param-reassign": "warn",
    "no-shadow": "warn",
    "no-use-before-define": "warn",
    camelcase: "warn",
    "consistent-return": "warn",
    "default-param-last": "warn",
    "no-return-await": "off",
    "no-throw-literal": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "no-useless-constructor": "off",
    "@typescript-eslint/no-useless-constructor": "warn",
    "no-undef": "warn",
    "no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "warn",
    "import/first": "warn",
    "no-empty": "warn",
    "import/no-dynamic-require": "warn",
    "@typescript-eslint/no-var-requires": "warn",
    "no-restricted-syntax": "off",
    "no-await-in-loop": "off",
    "@typescript-eslint/no-empty-interface": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "no-dupe-class-members": "off",
      },
    },
  ],
};
