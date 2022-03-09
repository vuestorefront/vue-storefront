const path = require('path');

module.exports = {
  "*.{js,vue,ts}": "eslint",
  "**/i18n/*.csv": [`node ${path.resolve(__dirname, './core/scripts/utils/sort-translations.js')}`, "git add"]
}
