/* eslint-disable import/no-unresolved */
import typescriptPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import { concat, defineFlatConfig } from "eslint-flat-config-utils";
import importPlugin from "eslint-plugin-import";

/**
 * Generates an ESLint Flat Config for TypeScript projects.
 *
 * @param {{ files?: string, isStrict?: boolean }} config - The base configuration object with optional files and isStrict fields.
 * @param {...import('eslint').Linter.Config[]} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function typescript(config, ...overrides) {
  const { files = "**/*.{ts,tsx,mts,cts,mtsx,ctsx}", isStrict = true, withImport = true } = config ?? {};

  return concat(
    withImport
      ? [
          importPlugin.flatConfigs.typescript,
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
              "import/resolver": {
                node: true,
                typescript: true,
              },
            },
          }),
        ]
      : [],
    defineFlatConfig({
      files: [files],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true,
          },
        },
      },
      name: "base-ts",
      plugins: {
        "@typescript-eslint": typescriptPlugin,
      },
      rules: {
        ...typescriptPlugin.configs.recommended.rules,
        "@typescript-eslint/array-type": "warn",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/default-param-last": "warn",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-member-accessibility": "warn",
        "@typescript-eslint/explicit-module-boundary-types": "warn",
        "@typescript-eslint/naming-convention": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-explicit-any": "warn",
        "@typescript-eslint/no-inferrable-types": "warn",
        "@typescript-eslint/no-magic-numbers": "warn",
        "@typescript-eslint/no-namespace": "warn",
        "@typescript-eslint/no-non-null-assertion": "off",
        // allow unused vars starting with `_` https://typescript-eslint.io/rules/no-unused-vars
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            argsIgnorePattern: "^_",
            caughtErrorsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
            varsIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-use-before-define": "warn",
        "@typescript-eslint/prefer-function-type": "warn",
        "default-param-last": "off",
        "no-magic-numbers": "off",
        "no-use-before-define": "off",
        "prefer-promise-reject-errors": "off",
      },
    }),
    isStrict
      ? [
          defineFlatConfig({
            files: [files],
            name: "strict/ts",
            rules: {
              // prefer `import type` https://typescript-eslint.io/rules/consistent-type-imports/
              "@typescript-eslint/consistent-type-imports": "error",
            },
          }),
        ]
      : [],
    overrides,
  );
}
