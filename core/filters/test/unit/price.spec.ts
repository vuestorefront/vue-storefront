import { price } from '@vue-storefront/core/filters/price'

jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn().mockReturnValue({
    i18n: {
      defaultLocale: 'en-US',
      currencySign: '$',
      currencyDecimal: '',
      currencyGroup: '',
      fractionDigits: 2,
      priceFormat: '{sign}{amount}'
    }
  })
}))

describe('price', () => {
  it('return value if it is not a number', () => {
    expect(price(undefined, null)).toBe(undefined)
  })

  it('returns number with sign', () => {
    expect(price(20.99, null)).toBe('$20.99')
  })

  it('returns input if i18n is not present in storeView object', () => {
    const mockedStoreView = {};

    expect(price(20.99, mockedStoreView)).toBe('20.99')
  })

  it('replaces group separators if currencyGroup provided', () => {
    const mockedStoreView = {
      i18n: {
        defaultLocale: 'en-US',
        currencySign: '$',
        currencyDecimal: '',
        currencyGroup: '10',
        fractionDigits: 2,
        priceFormat: '{sign}{amount}'
      }
    }

    expect(price(20.99, mockedStoreView)).toBe('$20.99')
  })

  it('replaces decimal separators if currencyDecimal provided', () => {
    const mockedStoreView = {
      i18n: {
        defaultLocale: 'en-US',
        currencySign: '$',
        currencyDecimal: '0.1',
        currencyGroup: '',
        fractionDigits: 2,
        priceFormat: '{sign}{amount}'
      }
    }

    expect(price(20.99, mockedStoreView)).toBe('$200.199')
  })

  it('adds minus if value is lower than 0', () => {
    expect(price(-9.99, null)).toBe('-$9.99')
  })
})
