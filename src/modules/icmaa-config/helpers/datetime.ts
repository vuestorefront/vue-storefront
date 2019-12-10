import dayjs, { Dayjs } from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { once } from '@vue-storefront/core/helpers'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

once('__VUE_EXTEND_DAYJS_CUSTOM_PARSE_FORMAT', () => {
  dayjs.extend(customParseFormat)
})

export const storeDateFormat = (): string => currentStoreView().i18n.dateFormat

export const getCurrentStoreviewDayjsDatetime = (): Dayjs => {
  let storeLocale = currentStoreView().i18n.defaultLocale.toLocaleLowerCase()
  const separatorIndex = storeLocale.indexOf('-')
  const languageCode = (separatorIndex > -1) ? storeLocale.substr(0, separatorIndex) : storeLocale
  return dayjs(new Date()).locale(languageCode)
}

export const getCurrentStoreviewDatetime = (): string => {
  return getCurrentStoreviewDayjsDatetime().format('YYYY-MM-DD HH:mm')
}

export const isDatetimeInBetween = (from: string, to: string, current = getCurrentStoreviewDatetime()): boolean => {
  return (!from || from === '' || dayjs(current).isAfter(from)) && (!to || to === '' || dayjs(current).isBefore(to))
}

export const isValid = (date: string, format?: string): boolean => {
  format = format || storeDateFormat()
  const jsDate = dayjs(date, format)
  return jsDate.isValid() && jsDate.format(format) === date
}

export const toDayjsDate = (date: string, format?: string, inputFormat: string = 'YYYY-MM-DD H:i'): Dayjs => {
  format = format || storeDateFormat()
  return dayjs(date, inputFormat || format)
}

export const toDate = (date: string, format?: string, inputFormat: string = 'YYYY-MM-DD H:i'): string => {
  format = format || storeDateFormat()
  return toDayjsDate(date, format, inputFormat).format(format)
}
