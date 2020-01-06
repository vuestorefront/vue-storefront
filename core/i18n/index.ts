import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Logger } from '@vue-storefront/core/lib/logger'
import { once } from '@vue-storefront/core/helpers'
import config from 'config'

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

/**
 * Lazy load date locales file for current switched language.
 */
const loadDateLocales = async (lang: string = 'en'): Promise<void> => {
  let localeCode = lang.toLocaleLowerCase()
  try { // try to load full locale name
    await import(/* webpackChunkName: "dayjs-locales-[request]" */ `dayjs/locale/${localeCode}`)
  } catch (e) { // load simplified locale name, example: de-DE -> de
    const separatorIndex = localeCode.indexOf('-')
    if (separatorIndex) {
      localeCode = separatorIndex ? localeCode.substr(0, separatorIndex) : localeCode
      try {
        await import(/* webpackChunkName: "dayjs-locales-[request]" */ `dayjs/locale/${localeCode}`)
      } catch (err) {
        Logger.debug('Unable to load translation from dayjs')()
      }
    }
  }
}

export async function loadLanguageAsync (lang: string): Promise<string> {
  await loadDateLocales(lang)
  if (!config.i18n.bundleAllStoreviewLanguages) {
    if (i18n.locale !== lang) {
      if (!loadedLanguages.includes(lang)) {
        try {
          const msgs = await import(/* webpackChunkName: "lang-[request]" */ `./resource/i18n/${lang}.json`)
          i18n.setLocaleMessage(lang, msgs.default)
          loadedLanguages.push(lang)
          return setI18nLanguage(lang)
        } catch (e) { // eslint-disable-line handle-callback-err
          Logger.debug('Unable to load translation')()
          return ''
        }
      }
      return setI18nLanguage(lang)
    }
  } else {
    loadedLanguages.push(lang)
    return setI18nLanguage(lang)
  }
  return lang
}

export default i18n
