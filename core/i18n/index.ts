import Vue from 'vue'
import VueI18n from 'vue-i18n'
import config from 'config'
import { Logger } from '@vue-storefront/core/lib/logger'
import { once } from '@vue-storefront/core/helpers'

once('__VUE_EXTEND_I18N__', () => {
  Vue.use(VueI18n)
})

const loadedLanguages = ['en-US']
const i18n = new VueI18n({
  locale: config.i18n.bundleAllStoreviewLanguages ? config.i18n.defaultLocale : 'en-US', // set locale
  fallbackLocale: 'en-US',
  messages: config.i18n.bundleAllStoreviewLanguages ? require('./resource/i18n/multistoreLanguages.json') : {
    'en-US': require('./resource/i18n/en-US.json')
  }
})

function setI18nLanguage (lang: string): string {
  i18n.locale = lang
  return lang
}

export function loadLanguageAsync (lang: string): Promise<string> {
  if (!config.i18n.bundleAllStoreviewLanguages) {
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `./resource/i18n/${lang}.json`).then(msgs => {
          i18n.setLocaleMessage(lang, msgs.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        }).catch(err => {
          Logger.debug('Unable to load translation')()
          return ''
        })
      }
      return Promise.resolve(setI18nLanguage(lang))
    }
  } else {
    loadedLanguages.push(lang)
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

loadLanguageAsync(config.i18n.defaultLocale)

export default i18n
