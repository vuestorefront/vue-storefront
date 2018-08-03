const loadedLanguages = ['en-US']

function setI18nLanguage (lang) {
  const i18n = global.$VS.i18n
  i18n.locale = lang
  return lang
}

export function loadLanguageAsync (lang) {
  const i18n = global.$VS.i18n
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `../resource/i18n/${lang}.json`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}
