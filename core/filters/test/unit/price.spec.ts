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
  it('Check if argument is not a number', () => {
    expect(price(undefined)).toBe(undefined)
  })

  it('Check if number is converted to string with sign', () => {
    expect(price('20.99')).toBe('$20.99')
  })

  it('Check if i18n doesn\'t exist', () => {
    const mockedStoreView = {};

    expect(price('20.99', mockedStoreView)).toBe('20.99')
  })

  it('Check if currencyDecimal is not empty string', () => {
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

    expect(price('20.99', mockedStoreView)).toBe('$20.99')
  })

  it('Check if currencyGroup is not empty string', () => {
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

    expect(price('20.99', mockedStoreView)).toBe('$200.199')
  })

  it('Check if value is smaller than 0', () => {
    expect(price('-9.99')).toBe('-$9.99')
  })
})
