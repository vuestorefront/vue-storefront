import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginPrettier from "eslint-plugin-prettier";
// import eslintPluginImport from "eslint-plugin-import";

export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 12,
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
        // ...globals.es2021 - equivalent of { env: { es2021: true }} doesn't exist in package
        ...globals.node,
        ...globals.jest,
      },
    },
    plugins: {
      "@typescript-eslint": tseslint.plugin,
      prettier: eslintPluginPrettier,
      //      import: eslintPluginImport,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "off",
      "no-underscore-dangle": "off",
      // "import/prefer-default-export": "off",
      // "import/extensions": [
      //   "error",
      //   "ignorePackages",
      //   {
      //     js: "never",
      //     ts: "never",
      //   },
      // ],
      // "import/no-extraneous-dependencies": "warn",
      // "import/no-dynamic-require": "warn",
      // "import/first": "warn",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-restricted-types": "warn",
      "@typescript-eslint/no-empty-function": "warn",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-useless-constructor": "warn",
      "@typescript-eslint/no-var-requires": "warn",
      "@typescript-eslint/no-empty-interface": "off",
      "no-param-reassign": "warn",
      "no-shadow": "warn",
      "no-use-before-define": "warn",
      camelcase: "warn",
      "consistent-return": "warn",
      "default-param-last": "warn",
      "no-return-await": "off",
      "no-throw-literal": "warn",
      "no-useless-constructor": "off",
      "no-undef": "warn",
      "no-empty-function": "off",
      "no-empty": "warn",
      "no-restricted-syntax": "off",
      "no-await-in-loop": "off",
    },
    settings: {
      "import/resolver": {
        node: {
          extensions: [".js", ".ts"],
        },
      },
    },
  },
  {
    files: ["*.ts", "*.tsx"],
    rules: {
      "no-dupe-class-members": "off",
    },
  },
];
