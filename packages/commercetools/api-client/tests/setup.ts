import { setup } from './../src/index'

jest.mock('./../src/helpers/createCommerceToolsLink')
jest.mock('apollo-client')

setup({ api: null, locale: 'en', currency: 'USD' })
