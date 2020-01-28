import { setup } from './../src/index'

jest.mock('./../src/helpers/createCommerceToolsLink')
jest.mock('./../src/api/updateCart', () => jest.fn(arg => arg))
jest.mock('./../src/api/createMyOrderFromCart', () => jest.fn(arg => arg))
jest.mock('apollo-client')

setup({
  api: null,
  locale: 'en',
  currency: 'USD',
  country: 'UK'
})
