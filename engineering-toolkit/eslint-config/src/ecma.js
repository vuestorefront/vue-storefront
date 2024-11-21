import js from "@eslint/js";
import { concat, defineFlatConfig } from "eslint-flat-config-utils";
import importPlugin from "eslint-plugin-import";
import eslintPluginJsonc from "eslint-plugin-jsonc";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";

/**
 * Generates an ESLint Flat Config for ECMAScript projects.
 *
 * @param {{ files?: string, isStrict?: boolean }} config - The base configuration object with optional files and isStrict fields.
 * @param {...import('eslint').Linter.Config} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function ecma(config, ...overrides) {
  const { files = "**/*.{mjs,cjs,js,jsx}", isStrict = true, withImport = true } = config ?? {};

  return concat(
    defineFlatConfig({
      files: [files],
      languageOptions: {
        globals: {
          ...globals.browser,
          ...globals.node,
        },
        parserOptions: {
          ecmaVersion: 2024,
          sourceType: "module",
        },
      },
      name: "base-js",
      ...js.configs.recommended,
    }),
    withImport
      ? [
          importPlugin.flatConfigs.recommended,
          defineFlatConfig({
            files: [files],
            languageOptions: {
              ecmaVersion: 2024,
              sourceType: "module",
            },
            name: "import",
            rules: {
              "import/no-anonymous-default-export": "warn",
            },
            settings: {
              "import/extensions": [".ts", ".tsx", ".mts", ".cts", ".mtsx", ".ctsx", ".js", ".jsx", ".mjs", ".cjs"],
              "import/resolver": {
                node: true,
              },
            },
          }),
        ]
      : [],
    eslintPluginJsonc.configs["flat/recommended-with-jsonc"],
    defineFlatConfig({
      files: [files],
      name: "best-practices",
      rules: {
        /* Enforce return statements in callbacks of array methods */
        "array-callback-return": "error",
        /* Require the use of === and !== */
        eqeqeq: ["error", "smart"],
        /* Disallow the use of alert, confirm, and prompt */
        "no-alert": "warn",
        /* Disallow multiple spaces */
        "no-multi-spaces": "error",
        /* Disallow the use of variables before they are defined */
        "no-use-before-define": ["error", { classes: false, functions: false, variables: true }],
        /* Require let or const instead of var */
        "no-var": "error",
      },
    }),
    defineFlatConfig({
      files: [files],
      name: "unicorn",
      plugins: {
        unicorn: unicornPlugin,
      },
      rules: {
        "unicorn/better-regex": "error",
        "unicorn/catch-error-name": "error",
        "unicorn/consistent-destructuring": "error",
        "unicorn/consistent-function-scoping": "off",
        "unicorn/custom-error-definition": "error",
        "unicorn/empty-brace-spaces": "error",
        "unicorn/error-message": "error",
        "unicorn/escape-case": "error",
        "unicorn/expiring-todo-comments": "off",
        "unicorn/explicit-length-check": "off",
        "unicorn/filename-case": "off",
        "unicorn/import-style": "off",
        "unicorn/new-for-builtins": "error",
        "unicorn/no-abusive-eslint-disable": "warn",
        "unicorn/no-array-callback-reference": "off",
        "unicorn/no-array-for-each": "off",
        "unicorn/no-array-method-this-argument": "error",
        "unicorn/no-array-push-push": "error",
        "unicorn/no-array-reduce": "off",
        "unicorn/no-await-expression-member": "off",
        "unicorn/no-console-spaces": "error",
        "unicorn/no-document-cookie": "error",
        "unicorn/no-empty-file": "error",
        "unicorn/no-for-loop": "off",
        "unicorn/no-hex-escape": "error",
        "unicorn/no-instanceof-array": "error",
        "unicorn/no-invalid-remove-event-listener": "error",
        "unicorn/no-keyword-prefix": "off",
        "unicorn/no-lonely-if": "error",
        "unicorn/no-nested-ternary": "error",
        "unicorn/no-new-array": "error",
        "unicorn/no-new-buffer": "error",
        "unicorn/no-null": "off",
        "unicorn/no-object-as-default-parameter": "error",
        "unicorn/no-process-exit": "off",
        "unicorn/no-static-only-class": "warn",
        "unicorn/no-this-assignment": "error",
        "unicorn/no-unreadable-array-destructuring": "error",
        "unicorn/no-unreadable-iife": "error",
        "unicorn/no-unsafe-regex": "error",
        "unicorn/no-unused-properties": "error",
        "unicorn/no-useless-fallback-in-spread": "error",
        "unicorn/no-useless-length-check": "error",
        "unicorn/no-useless-promise-resolve-reject": "error",
        "unicorn/no-useless-spread": "error",
        "unicorn/no-useless-switch-case": "error",
        "unicorn/no-useless-undefined": "error",
        "unicorn/no-zero-fractions": "error",
        "unicorn/number-literal-case": "error",
        "unicorn/numeric-separators-style": "error",
        "unicorn/prefer-add-event-listener": "warn",
        "unicorn/prefer-array-find": "warn",
        "unicorn/prefer-array-flat": "warn",
        "unicorn/prefer-array-flat-map": "warn",
        "unicorn/prefer-array-index-of": "warn",
        "unicorn/prefer-array-some": "warn",
        "unicorn/prefer-at": "warn",
        "unicorn/prefer-code-point": "warn",
        "unicorn/prefer-date-now": "warn",
        "unicorn/prefer-default-parameters": "warn",
        "unicorn/prefer-dom-node-append": "warn",
        "unicorn/prefer-dom-node-dataset": "warn",
        "unicorn/prefer-dom-node-remove": "warn",
        "unicorn/prefer-dom-node-text-content": "warn",
        "unicorn/prefer-event-target": "warn",
        "unicorn/prefer-export-from": "warn",
        "unicorn/prefer-includes": "warn",
        "unicorn/prefer-keyboard-event-key": "warn",
        "unicorn/prefer-math-trunc": "warn",
        "unicorn/prefer-modern-dom-apis": "warn",
        "unicorn/prefer-module": "warn",
        "unicorn/prefer-negative-index": "warn",
        "unicorn/prefer-node-protocol": "warn",
        "unicorn/prefer-number-properties": "warn",
        "unicorn/prefer-object-from-entries": "warn",
        "unicorn/prefer-optional-catch-binding": "warn",
        "unicorn/prefer-prototype-methods": "warn",
        "unicorn/prefer-query-selector": "warn",
        "unicorn/prefer-reflect-apply": "warn",
        "unicorn/prefer-regexp-test": "warn",
        "unicorn/prefer-set-has": "warn",
        "unicorn/prefer-spread": "warn",
        "unicorn/prefer-string-replace-all": "warn",
        "unicorn/prefer-string-slice": "warn",
        "unicorn/prefer-string-starts-ends-with": "warn",
        "unicorn/prefer-switch": "warn",
        "unicorn/prefer-ternary": "warn",
        "unicorn/prefer-top-level-await": "warn",
        "unicorn/prefer-type-error": "warn",
        "unicorn/prevent-abbreviations": "off",
        "unicorn/require-array-join-separator": "error",
        "unicorn/require-number-to-fixed-digits-argument": "error",
        "unicorn/require-post-message-target-origin": "error",
        "unicorn/string-content": "off",
        "unicorn/template-indent": "error",
        "unicorn/text-encoding-identifier-case": "error",
        "unicorn/throw-new-error": "warn",
      },
    }),
    isStrict
      ? [
          defineFlatConfig({
            files: [files],
            name: "strict/js",
            rules: {
              // sort keys in JSON files https://eslint.org/docs/latest/rules/sort-keys
              "jsonc/sort-keys": ["error"],
              // https://eslint.org/docs/latest/rules/no-restricted-imports
              "no-restricted-imports": [
                "error",
                {
                  patterns: [
                    {
                      group: ["../../*"],
                      message: "Use absolute imports (@/) instead",
                    },
                  ],
                },
              ],
            },
          }),
          defineFlatConfig({
            files: ["package.json"],
            name: "strict/package-json",
            rules: {
              // no need to sort keys in package.json
              "jsonc/sort-keys": "off",
            },
          }),
        ]
      : [],
    overrides,
  );
}
