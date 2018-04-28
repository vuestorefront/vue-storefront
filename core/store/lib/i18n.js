let i18n = global.$VS ? global.$VS.i18n : null // TODO: we should have translation support separated from the VS core
if (!i18n) {
  i18n = {
    t: function (key) {
      return key
    }
  }
}
export default i18n
