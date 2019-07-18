import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import dayjs from 'dayjs'
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat'
const allLocales = require.context('dayjs/locale/', false, /\.js$/)

// daysjs requires an extension for locale formatting
dayjs.extend(dayjsLocalizedFormat)

export function formatDate (date, format = 'l LT') {
  const storeLocale = currentStoreView().i18n.defaultLocale.toLowerCase()
  const currentLocale = dayjs.locale()
  // if dayjs locale is not same as store locale
  if (currentLocale !== storeLocale) {
    const localKeys = allLocales.keys()
    const localeFile = `./${storeLocale}.js`
    // check for full local, e.g. 'en-US'
    if (localKeys.includes(localeFile)) {
      dayjs.locale(allLocales(localeFile))
    } else {
      const language = storeLocale.split('-')[0]
      // next check language part of the store locale, e.g. 'en'
      if (currentLocale !== language) {
        const languageFile = `./${language}.js`
        if (localKeys.includes(languageFile)) {
          dayjs.locale(allLocales(languageFile))
        }
      }
    }
  }
  return dayjs(date).format(format)
}
