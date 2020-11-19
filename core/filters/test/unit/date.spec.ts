import { date } from '@vue-storefront/core/filters'
import { currentStoreView } from '@vue-storefront/core/lib/multistore'
import config from 'config'

jest.clearAllMocks()
jest.mock('config', () => ({}))
jest.mock('@vue-storefront/core/lib/logger', () => ({
  Logger: {}
}))
jest.mock('@vue-storefront/core/store', () => ({}))
jest.mock('@vue-storefront/core/modules/url/helpers', () => ({}))

const dateFormats = [
  ['YY/MM/DD', '20/11/12'],
  ['YY/DD/MM', '20/12/11']
]

describe('date', () => {
  it('Check if date format is ', () => {
    dateFormats.map(
      dateFormat => expect(date('2020-11-11', dateFormat[0], currentStoreView)).toBe(dateFormat[1])
    )
  })
})
