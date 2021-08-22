import {
  price,
  htmlDecode,
  date,
  capitalize,
  formatProductMessages,
  stripHTML
} from '@vue-storefront/core/filters'

jest.mock('@vue-storefront/core/filters/date', () => ({
  date: 'mockedDateFunction'
}))
jest.mock('@vue-storefront/core/filters/capitalize', () => ({
  capitalize: 'mockedCapitalizeFunction'
}))
jest.mock('@vue-storefront/core/filters/html-decode', () => ({
  htmlDecode: 'mockedHtmlDecodeFunction'
}))
jest.mock('@vue-storefront/core/filters/price', () => ({
  price: 'mockedPriceFunction'
}))
jest.mock('@vue-storefront/core/filters/strip-html', () => ({
  stripHTML: 'mockedStripeHtmlFunction'
}))
jest.mock('@vue-storefront/core/filters/product-messages', () => ({
  formatProductMessages: 'mockedProductMessagesFunction'
}))

describe('index', () => {
  it('possible to import', () => {
    expect(date).toBe('mockedDateFunction')
    expect(capitalize).toBe('mockedCapitalizeFunction')
    expect(htmlDecode).toBe('mockedHtmlDecodeFunction')
    expect(price).toBe('mockedPriceFunction')
    expect(stripHTML).toBe('mockedStripeHtmlFunction')
    expect(formatProductMessages).toBe('mockedProductMessagesFunction')
  });
})
