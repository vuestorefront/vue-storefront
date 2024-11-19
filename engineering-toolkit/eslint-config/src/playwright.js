import { concat, defineFlatConfig } from "eslint-flat-config-utils";
import playwrightPlugin from "eslint-plugin-playwright";

/**
 * Generates an ESLint Flat Config for Playwright projects.
 *
 * @param {{ files?: string }} config - The base configuration object with an optional files field.
 * @param {...import('eslint').Linter.Config} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function playwright(config, ...overrides) {
  const { files = "**/*.test.ts" } = config ?? {};

  return concat(
    defineFlatConfig({
      ...playwrightPlugin.configs["flat/recommended"],
      files: [files],
      rules: {
        ...playwrightPlugin.configs["flat/recommended"].rules,
        "max-lines": "off",
        "max-lines-per-function": "off",
        "max-statements": "off",
        "no-console": "off",
        "no-empty-pattern": "off",
        "playwright/expect-expect": "off",
        "playwright/no-get-by-title": "error",
        "playwright/prefer-comparison-matcher": "warn",
        "playwright/prefer-equality-matcher": "warn",
        "playwright/prefer-hooks-in-order": "error",
        "playwright/prefer-hooks-on-top": "error",
        "playwright/prefer-to-be": "warn",
        "playwright/prefer-to-have-count": "warn",
        "playwright/prefer-to-have-length": "warn",
        "playwright/require-top-level-describe": "error",
      },
    }),
    overrides,
  );
}
