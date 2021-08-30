import { createApiClient } from './../src/index.server';

jest.mock('../src/helpers/createCommerceToolsLink');
jest.mock('../src/api/updateCart', () => jest.fn((arg) => arg));
jest.mock('../src/api/createMyOrderFromCart', () => jest.fn((arg) => arg));
jest.mock('apollo-client');
jest.mock('@commercetools/sdk-auth');
jest.mock('../src/helpers/createAccessToken', () => jest.fn());

export default createApiClient({
  api: {} as any,
  locale: 'en',
  acceptLanguage: ['en', 'de'],
  currency: 'USD',
  country: 'UK',
  cookies: {
    currencyCookieName: 'test-vsf-currency',
    countryCookieName: 'test-vsf-country',
    localeCookieName: 'test-vsf-locale',
    storeCookieName: 'test-vsf-store'
  },
  auth: {
    onTokenChange: jest.fn(),
    onTokenRemove: jest.fn()
  },
  storeService: {
    changeCurrentStore: jest.fn()
  }
} as any);
