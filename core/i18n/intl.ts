import areIntlLocalesSupported from 'intl-locales-supported'

export const importIntlPolyfill = async () => {
  const IntlPolyfill = await import('intl')
  global.Intl = IntlPolyfill.default
}

export const checkForIntlPolyfill = async (storeView) => {
  const globDTO = typeof window !== 'undefined' ? window : global
  if (!globDTO.hasOwnProperty('Intl') || !areIntlLocalesSupported(storeView.i18n.defaultLocale)) {
    await importIntlPolyfill()
  }
}
