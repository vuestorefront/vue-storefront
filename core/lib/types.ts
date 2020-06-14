export interface LocalizedRoute {
  path?: string,
  name?: string,
  hash?: string,
  params?: { [key: string]: unknown },
  fullPath?: string,
  host?: string
}

export interface StoreView {
  storeCode: string,
  extend?: string,
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
    sourcePriceIncludesTax?: boolean,
    finalPriceIncludesTax?: boolean,
    deprecatedPriceFieldsSupport?: boolean,
    defaultCountry: string,
    defaultRegion: null | string,
    calculateServerSide: boolean,
    userGroupId?: number,
    useOnlyDefaultUserGroupId: boolean
  },
  i18n: {
    fullCountryName: string,
    fullLanguageName: string,
    defaultLanguage: string,
    defaultCountry: string,
    defaultLocale: string,
    currencyCode: string,
    currencySign: string,
    currencyDecimal: string,
    currencyGroup: string,
    fractionDigits: number,
    priceFormat: string,
    dateFormat: string
  },
  seo: {
    defaultTitle: string
  }
}
