/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "plugin:jsonc/recommended-with-json",
    "plugin:perfectionist/recommended-natural",
  ],
  root: true,
  ignorePatterns: [
    "node_modules",
    ".next",
    ".turbo",
    "out",
    "build",
    "dist",
    "public",
  ],
  rules: {
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
        type: "natural",
        "internal-pattern": ["@/**"],
        groups: [
          ["external", "side-effect"],
          "internal",
          ["parent", "sibling", "index"],
          ["object", "unknown"],
        ],
      },
    ],
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
  },
};
