let i18n = global.$VS ? global.$VS.i18n : null // TODO: we should have translation support separated from the VS core
if (!i18n) {
  global.$VS.i18n = {
    t: function (...params) {
      if (global.$VS.i18n) {
        return global.$VS.i18n.t(...params)
      } else {
        return params ? params[0] : ''
      }
    }
  }
}
export default global.$VS.i18n
