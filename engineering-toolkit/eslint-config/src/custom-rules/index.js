/* eslint-disable global-require */
/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  rules: {
    "export-component-props": require("./rules/export-component-props"),
  },
};
