import VueI18n from 'vue-i18n'
import config from 'config'
import Vue from 'vue'
import { loadLanguageAsync } from 'core/lib/i18n-utils'

Vue.use(VueI18n)

const i18n = new VueI18n({
  locale: 'en-US', // set locale
  fallbackLocale: 'en-US'
})
i18n.setLocaleMessage('en-US', require('../resource/i18n/en-US.json'))

if (!global.$VS) { global.$VS = { i18n: i18n } } else { global.$VS.i18n = i18n }
export default global.$VS.i18n

loadLanguageAsync(config.i18n.defaultLocale)
