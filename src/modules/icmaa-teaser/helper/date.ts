import dayjs from 'dayjs'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'

export const getCurrentStoreviewDatetime = (): string => {
  let storeLocale = currentStoreView().i18n.defaultLocale.toLocaleLowerCase()
  const separatorIndex = storeLocale.indexOf('-')
  const languageCode = (separatorIndex > -1) ? storeLocale.substr(0, separatorIndex) : storeLocale
  return dayjs(new Date()).locale(languageCode).format('YYYY-MM-DD HH:mm')
}

export const isDatetimeInBetween = (from: string, to: string, current = getCurrentStoreviewDatetime()): boolean => {
  return dayjs(current).isAfter(from) && dayjs(current).isBefore(to)
}
