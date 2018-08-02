import VueI18n from 'vue-i18n'
import config from 'config'
import Vue from 'vue'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en-US', // set locale
  fallbackLocale: 'en-US',
  messages: require('../resource/i18n/en-US.json')
})

const loadedLanguages = ['en-US']
const defaultLocale = config.i18n.defaultLocale

function setI18nLanguage (lang) {
  i18n.locale = lang
  return lang
}

function loadLanguageAsync (lang) {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */  `../resource/i18n/${lang}.json`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      })
    } 
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

loadLanguageAsync(defaultLocale)

if (!global.$VS) { global.$VS = { i18n: i18n } } else { global.$VS.i18n = i18n }
export default global.$VS.i18n
