import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from 'config'

Vue.use(VueI18n)

const loadedLanguages = ['en-US']
const i18n = new VueI18n({
  locale: 'en-US', // set locale
  fallbackLocale: 'en-US',
  messages: {
    'en-US': require('../resource/i18n/en-US.json')
  }
})

function setI18nLanguage (lang: string): string {
  i18n.locale = lang
  return lang
}

export function loadLanguageAsync (lang: string): Promise<string> {
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      return import(/* webpackChunkName: "lang-[request]" */ `../resource/i18n/${lang}.json`).then(msgs => {
        i18n.setLocaleMessage(lang, msgs.default)
        loadedLanguages.push(lang)
        return setI18nLanguage(lang)
      }).catch(err => {
        console.debug('Unable to load translation')
        return ''
      })
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

loadLanguageAsync(config.i18n.defaultLocale)

export default i18n
