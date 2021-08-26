import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import dayjs from 'dayjs'
import dayjsLocalizedFormat from 'dayjs/plugin/localizedFormat'
import { once } from '../helpers';

once('__VUE_EXTEND_DAYJS_LOCALIZED_FORMAT__', () => {
  dayjs.extend(dayjsLocalizedFormat)
})

/**
 * Converts date to format provided as an argument or defined in config file (if argument not provided)
 * @param {String} date
 * @param {String} format
 */
export function date (date, format, storeView) {
  const _storeView = storeView || currentStoreView()
  const displayFormat = format || _storeView.i18n.dateFormat
  let storeLocale = _storeView.i18n.defaultLocale.toLocaleLowerCase()
  const separatorIndex = storeLocale.indexOf('-')
  const languageCode = (separatorIndex > -1) ? storeLocale.substr(0, separatorIndex) : storeLocale

  const isStoreLocale = dayjs().locale(storeLocale).locale()
  const isLanguageLocale = dayjs().locale(languageCode).locale()
  const locale = isStoreLocale || isLanguageLocale

  if (locale) return dayjs(date).locale(languageCode).format(displayFormat)
  return dayjs(date).format(displayFormat)
}
