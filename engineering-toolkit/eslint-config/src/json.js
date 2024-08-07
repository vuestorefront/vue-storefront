module.exports = {
  extends: ["plugin:jsonc/recommended-with-jsonc"],
  overrides: [
    {
      files: ["**/*.{json,json5,jsonc}"],
      parser: "jsonc-eslint-parser",
      excludedFiles: ["package-lock.json"],
    },
  ],
};
