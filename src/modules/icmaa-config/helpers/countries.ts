import * as i18nIsoCountries from 'i18n-iso-countries'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

const VsfCountries = require('@vue-storefront/i18n/resource/countries.json')

export const getTranslatedCountries = (languageCode?: string) => VsfCountries.map(c => {
  if (!languageCode) {
    languageCode = currentStoreView().i18n.defaultLanguage
  }
  languageCode = (languageCode as string).toLowerCase()

  i18nIsoCountries.registerLocale(require(`i18n-iso-countries/langs/${languageCode}.json`))
  if (languageCode && Object.values(i18nIsoCountries.getNames(languageCode)).length > 0) {
    c.name = i18nIsoCountries.getName(c.code, languageCode) || c.name
  }

  return c
}).sort((a, b) => a.name.localeCompare(b.name))
