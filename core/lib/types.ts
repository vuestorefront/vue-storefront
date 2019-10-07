export interface LocalizedRoute {
  path?: string,
  name?: string,
  hash?: string,
  params?: object,
  fullPath?: string,
  host?: string
}

export interface StoreView {
  storeCode: string,
  disabled?: boolean,
  storeId: any,
  name?: string,
  url?: string,
  appendStoreCode?: boolean,
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
