import { translations } from 'core/lib/themes'
import VueI18n from 'vue-i18n'
import config from 'config'
import Vue from 'vue'

Vue.use(VueI18n)

// TODO: divide the translations to separate json files: https://github.com/kazupon/vue-i18n/blob/dev/examples/ssr/hn2/src/i18n/index.js
const messages = translations() // load theme and core messages
const i18n = new VueI18n({
  locale: config.i18n.defaultLocale, // set locale
  fallbackLocale: 'en-US',
  messages // set locale messages
})

export default i18n
