import { helpers } from 'vuelidate/lib/validators'
import { isValid } from './datetime'

import { unicodeAlpha as orgUnicodeAlpha, unicodeAlphaNum as orgUnicodeAlphaNum } from '@vue-storefront/core/helpers/validators'

export const date = (v) => !helpers.req(v) || isValid(v)

export const unicodeAlpha = (v) => !helpers.req(v) || orgUnicodeAlpha(v)
export const unicodeAlphaNum = (v) => !helpers.req(v) || orgUnicodeAlphaNum(v)

/**
 * #161201 Check for latin-characters or spaces only in this field
 * The {Cyrillic} character wont work, sadly so we need to use this range for now
 * We use the unicode ranges of the different latin character sets
 * http://jrgraphix.net/research/unicode_blocks.php
 */
export const latin = (v) => {
  return !helpers.req(v) || !/([^\u0020-\u007F\u00A0-\u00FF\u0100-\u017F\u0180-\u024F\s]+)/g.test(v)
}

/**
 * #73223 Check that address is not Email
 */
export const streetname = (v) => {
  return !helpers.req(v) || !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(v)
}

export const getPostcodeRegex = (code: string = 'XX') => {
  var regex = {
    'DE': [/(^\d{5}$)/, '12345'],
    'GB': [/(^[A-Za-z]{1,2}\d{1,2}[A-Za-z]? \d[A-Za-z]{2}$)/, 'AA12 1AA'],
    'CH': [/(^\d{4}$)/, '1234'],
    'US': [/(^\d{5}([-\s/]?\d{4})?$)/, '12345-1234'],
    'SE': [/^\d{3}\s\d{2}/, '123 12'],
    'NO': [/(^\d{2,4}$)/, '1234'],
    'AU': [/(^\d{4}$)/, '1234'],
    'FI': [/(^\d{2,5}$)/, '12345'],
    'GR': [/^\d{3}\s\d{2}/, '123 12'],
    'DK': [/(^\d{4}$)/, '1234'],
    'CZ': [/^\d{3}\s\d{2}/, '123 12'],
    'NL': [/(^[1-9]{1}\d{3}\s?[A-Z]{2}$)/, '1123 AA'],
    'DZ': [/(^\d{5}$)/, '12345'],
    'AD': [/(^[A]{1}[D]{1}\d{3}$)/, 'AD123'],
    'AR': [/(^[A-Z]{1}\d{4}[A-Z]{3}$)/, 'A1234ABC'],
    'AT': [/(^\d{4}$)/, '1234'],
    'BY': [/(^\d{6}$)/, '123456'],
    'BE': [/(^\d{4}$)/, '1234'],
    'BA': [/(^\d{5}$)/, '12345'],
    'BR': [/(^\d{5}[-]\d{3}$)/, '12345-123'],
    'BN': [/(^[A-Z]{2}\d{4}$)/, 'AB1234'],
    'BG': [/(^\d{4}$)/, '1234'],
    'CA': [/(^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )\d[ABCEGHJKLMNPRSTVWXYZ]\d$)/, 'A1B2C3'],
    'CL': [/(^\d{7}$)/, '21234567'],
    'CN': [/(^\d{6}$)/, '123456'],
    'HR': [/(^\d{2}\s\d{3}$)/, '12 123'],
    'CY': [/(^\d{4}$)/, '1234'],
    'EE': [/(^\d{5}$)/, '12345'],
    'FR': [/(^\d{5}$)/, '12345'],
    'GE': [/(^\d{4}$)/, '1234'],
    'HK': [/(^\d{6}$)/, '123456'],
    'HU': [/(^\d{4}$)/, '1234'],
    'IS': [/(^\d{3}$)/, '123'],
    'IL': [/(^\d{5}$)/, '12345'],
    'IT': [/(^\d{5}$)/, '12345'],
    'JP': [/(^\d{3}[-]\d{4}$)/, '123-1234'],
    'LV': [/(^[A-Z]{2}[-]\d{4}$)/, 'AB-1234'],
    'LT': [/(^\d{5}$)/, '12345'],
    'LU': [/(^\d{4}$)/, '1234'],
    'MK': [/(^\d{4}$)/, '1234'],
    'MT': [/(^[A-Z]{3}\s\d{4}$)/, 'ABC 1234'],
    'MC': [/(^\d{5}$)/, '12345'],
    'NZ': [/(^\d{4}$)/, '1234'],
    'PL': [/(^\d{2}[-]\d{3}$)/, '12-123'],
    'PT': [/(^\d{4}[-]\d{3}$)/, '1234-123'],
    'RO': [/(^\d{6}$)/, '123456'],
    'RU': [/(^\d{6}$)/, '123456'],
    'RS': [/(^\d{5}$)/, '12345'],
    'SG': [/(^\d{6}$)/, '123456'],
    'SK': [/(^\d{3}\s\d{2}$)/, '1234 56'],
    'SI': [/(^\d{4}$)/, '1234'],
    'ZA': [/(^\d{4}$)/, '1234'],
    'ES': [/(^\d{5}$)/, '12345'],
    'TH': [/(^\d{5}$)/, '12345'],
    'TR': [/(^\d{5}$)/, '12345'],
    'IE': [/(.*)/, ''],
    'XX': [/(^[A-z0-9]{2,10}([\s]{0,2}|[-]{0,2})[A-z0-9]{2,10}$)/, '12345']
  }

  if (!Object.keys(regex).includes(code)) {
    code = 'XX'
  }

  return regex[code]
}

export const postcode = (code: string = 'XX') => (v) => {
  return !helpers.req(v) || getPostcodeRegex(code)[0].test(v)
}

export const isTrue = (v) => v === true

export const regex = (regex: string) => helpers.regex('regex', new RegExp(regex))
