export interface StoreView {
  storeCode: string,
  disabled?: boolean,
  storeId: number | string,
  name?: string,
  url?: string,
  elasticsearch: {
    host: string,
    index: string
  },
  tax: {
    sourcePriceIncludesTax: boolean,
    defaultCountry: string,
    defaultRegion: null | string,
    calculateServerSide: boolean
  },
  i18n: {
    fullCountryName: string,
    fullLanguageName: string,
    defaultLanguage: string,
    defaultCountry: string,
    defaultLocale: string,
    currencyCode: string,
    currencySign: string,
    dateFormat: string
  }
}
