import { concat, defineFlatConfig } from "eslint-flat-config-utils";
import jsoncPlugin from "eslint-plugin-jsonc";
import perfectionistPlugin from "eslint-plugin-perfectionist";
import prettierPlugin from "eslint-plugin-prettier/recommended";

/**
 * Generates an ESLint Flat Config with Prettier and Perfectionist plugins.
 *
 * @param {{ files?: string }} config - The base configuration object with an optional files field.
 * @param {...import('eslint').Linter.Config} overrides - Additional configuration overrides.
 * @returns {import('eslint').Linter.Config} The concatenated ESLint configuration.
 */
export function style(config, ...overrides) {
  const { files = "**/*.{mjs,cjs,js,jsx,ts,tsx,mts,cts,mtsx,ctsx}" } = config ?? {};

  return concat(
    prettierPlugin,
    jsoncPlugin.configs["flat/prettier"],
    defineFlatConfig({
      files: [files],
      name: "perfectionist",
      plugins: {
        perfectionist: perfectionistPlugin,
      },
      rules: {
        ...perfectionistPlugin.configs["recommended-natural"].rules,
        /**
         * https://eslint-plugin-perfectionist.azat.io/rules/sort-imports
         * Example:
         *
         * import "./globals.css"; // side-effect
         * import type { Metadata } from "next"; // external
         * import { Inter } from "next/font/google"; // external
         *
         * import Lint from "@/components/Lints"; // internal
         *
         */
        "perfectionist/sort-imports": [
          "error",
          {
            groups: [["external", "side-effect"], "internal", ["parent", "sibling", "index"], ["object", "unknown"]],
            internalPattern: ["@/**"],
            sortSideEffects: true,
            type: "natural",
          },
        ],
      },
    }),
    overrides,
  );
}
