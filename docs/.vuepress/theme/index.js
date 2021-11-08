const { resolve } = require("path");

module.exports = {
  extends: '@vuepress/theme-default',

  layouts: {
    Layout: resolve(__dirname, './layouts/Layout.vue')
  }
};
