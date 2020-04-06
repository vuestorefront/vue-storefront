import { params } from '../../src/useLocale/factoryParams';

jest.mock('@vue-storefront/commercetools-api', () => ({
  countries: ['us'],
  currencies: ['usd'],
  locales: ['en']
}));

describe('[commercetools-composables] factoryParams', () => {
  it('loadAvailableLocales returns available locales from config', async () => {
    expect(await params.loadAvailableLocales()).toEqual(['en']);
  });
  it('loadAvailableCountries returns available locales from config', async () => {
    expect(await params.loadAvailableCountries()).toEqual(['us']);
  });
  it('loadAvailableCurrencies returns available locales from config', async () => {
    expect(await params.loadAvailableCurrencies()).toEqual(['usd']);
  });
});
