import { date } from '@vue-storefront/core/filters/date'

jest.mock('@vue-storefront/core/helpers', () => ({
  once: jest.fn((a, b) => b())
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
  it(' returns date with format defined in config', () => {
    expect(date('2020-05-10', null, null)).toBe('00:00 10/5/2020')
  })

  it('returns date with format provided as an argument', () => {
    const mockedStoreView = {
      i18n: {
        defaultLocale: 'en-US'
      }
    }
    const dateFormat = 'YYYY/MM/DD'
    expect(date('2020-05-10', dateFormat, mockedStoreView)).toBe('2020/05/10')
  })
})
