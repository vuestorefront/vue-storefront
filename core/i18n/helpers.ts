import config from 'config'

export const currentBuildLocales = (): string[] => {
  const defaultLocale = config.i18n.defaultLocale || 'en-US'
  const multistoreLocales = config.storeViews.multistore
    ? Object.values(config.storeViews)
      .map((store: any) => store && typeof store === 'object' && store.i18n && store.i18n.defaultLocale)
      .filter(Boolean)
    : config.i18n.availableLocale
  const locales = multistoreLocales.includes(defaultLocale)
    ? multistoreLocales
    : [defaultLocale, ...multistoreLocales]

  return locales
}

export const transformToShortLocales = (locales: string[]): string[] => locales.map(locale => {
  const separatorIndex = locale.indexOf('-')
  const shortLocale = separatorIndex ? locale.substr(0, separatorIndex) : locale

  return shortLocale
})

export const buildLocaleIgnorePattern = (): RegExp => {
  const locales = transformToShortLocales(currentBuildLocales())
  const localesRegex = locales.map(locale => `${locale}$`).join('|')

  return new RegExp(localesRegex)
}
