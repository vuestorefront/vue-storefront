module.exports = {
  overrides: [
    {
      files: ["**/*.{jsx,tsx}"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  ],
  settings: {
    react: {
      version: "detect",
    },
  },
  extends: ["plugin:react/recommended", "plugin:react-hooks/recommended"],
  rules: {
    /* Relax rule which enforces that React variable must be in scope */
    "react/react-in-jsx-scope": "off",
    /* Disable rule which enforces that there is no spreading for any JSX attribute */
    "react/jsx-props-no-spreading": "off",
    /* Disable rule which enforces bind of this context */
    "react/jsx-no-bind": "off",
    /* Warn about violating rules of hooks */
    "react-hooks/rules-of-hooks": "warn",
    /* Warn about missing dependency in an effect hook */
    "react-hooks/exhaustive-deps": "warn",
  },
};
