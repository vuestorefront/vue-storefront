import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import areIntlLocalesSupported from 'intl-locales-supported'

export const importIntlPolyfill = async () => {
  const IntlPolyfill = await import('intl')
  global.Intl = IntlPolyfill.default
}

export const checkForIntlPolyfill = async () => {
  if (global.Intl) {
    if (!areIntlLocalesSupported(currentStoreView().i18n.defaultLocale)) {
      await importIntlPolyfill()
    }
  } else {
    await importIntlPolyfill()
  }
}
