let i18n = global.i18n // TODO: we should have translation support separated from the VS core
if (!global.i18n) {
  i18n = {
    t: function (key) {
      return key
    }
  }
}
export default i18n
