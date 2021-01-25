import { date } from '@vue-storefront/core/filters/date'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn()
}));

jest.mock('@vue-storefront/core/lib/multistore', () => ({
  currentStoreView: jest.fn().mockReturnValue({
    i18n: {
      defaultLocale: 'en-US',
      dateFormat: 'HH:mm D/M/YYYY'
    }
  })
}))

describe('date', () => {
  it('Check if date is converted to format defined in config file', () => {
    expect(date('2020-05-10')).toBe('00:00 10/5/2020')
  })

  it('Check if date is converted to format provided as an argument', () => {
    const mockedStoreView = {
      i18n: {
        defaultLocale: 'en-US'
      }
    }
    const dateFormat = 'YYYY/MM/DD'
    expect(date('2020-05-10', dateFormat, mockedStoreView)).toBe('2020/05/10')
  })
})
