/* eslint-disable global-require */
/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [require.resolve("./next")],
  plugins: ["jsdoc", "filename-rules"],
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
    // prefer `import type` https://typescript-eslint.io/rules/consistent-type-imports/
    "@typescript-eslint/consistent-type-imports": "error",
    // enforce kebab-case for file naming https://github.com/dolsem/eslint-plugin-filename-rules
    "filename-rules/match": [
      "error",
      { ".ts": "kebabcase", ".tsx": "kebabcase" },
    ],
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
    // prefer props destructuring function Component({ prop }) https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/destructuring-assignment.md
    "react/destructuring-assignment": ["error", "always"],
    // enforce PascalCase for React components https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md
    "react/jsx-pascal-case": ["error"],
    // prefer function declaration for components https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/function-component-definition.md
    "react/function-component-definition": [
      "error",
      {
        namedComponents: "function-declaration",
        unnamedComponents: "arrow-function",
      },
    ],
  },
  overrides: [
    {
      // no need to sort keys in package.json
      files: ["package.json"],
      rules: {
        "jsonc/sort-keys": "off",
      },
    },
    {
      // prefer default export for React components
      files: ["*.tsx"],
      rules: {
        "import/prefer-default-export": ["error"],
      },
    },
    {
      // allow different case for Next.js built in files and config
      files: ["app/**/*.tsx", "config/**/*.tsx"],
      rules: {
        "filename-rules/match": "off",
      },
    },
    {
      files: ["components/**/*.tsx"],
      rules: {
        // require JSDoc for components
        "jsdoc/require-jsdoc": [
          "error",
          {
            contexts: ["TSMethodSignature", "TSPropertySignature"],
            require: {
              FunctionDeclaration: false,
            },
            publicOnly: true,
            fixerMessage: " TODO: Add JSDoc comment",
          },
        ],
        // prefer "interface" over "type" for component props
        "@typescript-eslint/consistent-type-definitions": "error",
        // enforce export component props
        "custom-rules/export-component-props": "error",
      },
    },
    {
      // require JSDoc for reusable UI parts and logic
      files: [
        "hooks/**/*.ts",
        "hooks/**/*.tsx",
        "helpers/**/*.ts",
        "helpers/**/*.tsx",
      ],
      rules: {
        "jsdoc/require-jsdoc": [
          "error",
          {
            contexts: ["TSMethodSignature", "TSPropertySignature"],
            publicOnly: true,
            fixerMessage: " TODO: Add JSDoc comment",
          },
        ],
      },
    },
    {
      // allow different case for root directory files
      excludedFiles: ["*/*"],
      files: "*",
      rules: {
        "filename-rules/match": "off",
      },
    },
  ],
};
