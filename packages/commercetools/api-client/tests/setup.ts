import { setup } from 'api-client/src/index'

jest.mock('api-client/src/helpers/createCommerceToolsLink')
jest.mock('apollo-client')

setup({ config: null, locale: 'en', currency: 'USD' })
