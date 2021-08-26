module.exports = {
  "*.{js,vue,ts}": "eslint",
  "**/i18n/*.csv": ["node ./core/scripts/utils/sort-translations.js", "git add"]
}
