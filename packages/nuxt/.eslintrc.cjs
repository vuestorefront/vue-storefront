module.exports = {
  root: true,
  extends: [
    "@vue-storefront/eslint-config",
    "@vue-storefront/eslint-config/vue3",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".vue"],
  },
  rules: {
    complexity: 0,
    "max-statements": "off",
    "max-lines-per-function": "off",
  },
};
