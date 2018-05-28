let i18n = global.$VS ? global.$VS.i18n : null // TODO: we should have translation support separated from the VS core
if (!i18n) {
  global.$VS.i18n = {
    t: function (key) {
      if (global.$VS.i18n) {
        return global.$VS.i18n.t(key)
      } else {
        return key
      }
    }
  }
}
export default global.$VS.i18n
