import { setup } from './../src/index'

jest.mock('./../src/helpers/createCommerceToolsLink')
jest.mock('apollo-client')

setup({ config: null, locale: 'en', currency: 'USD' })
