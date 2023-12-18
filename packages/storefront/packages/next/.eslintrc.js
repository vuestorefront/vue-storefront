module.exports = {
  root: true,
  extends: [
    "@vue-storefront/eslint-config",
    "@vue-storefront/eslint-config/react",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  rules: {
    complexity: 0,
    "max-statements": "off",
  },
};
