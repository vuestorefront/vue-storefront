import {params} from '../../../src/composables/useLocale/factoryParams';

jest.mock('@vue-storefront/about-you-api', () => ({
  getSettings: jest.fn(() => ({
    locales: ['en'],
    countries: ['en'],
    currencies: ['en']
  }))
}));

describe('[about-you-cloud composables] useLocale factoryParams', () => {
  it('loadAvailableLocales returns available locales from config', async () => {
    expect(await params.loadAvailableLocales()).toEqual(['en']);
  });
  it('loadAvailableCountries returns available countries from config', async () => {
    expect(await params.loadAvailableCountries()).toEqual(['en']);
  });
  it('loadAvailableCurrencies returns available currencies from config', async () => {
    expect(await params.loadAvailableCurrencies()).toEqual(['en']);
  });
  it('setLocales returns given locale', async () => {
    expect(await params.setLocale({code: 'en', label: 'English'})).toEqual({code: 'en', label: 'English'});
  });
  it('setLocales returns given country', async () => {
    expect(await params.setCountry({code: 'en', label: 'English'})).toEqual({code: 'en', label: 'English'});
  });
  it('setLocales returns given currency', async () => {
    expect(
      await params.setCurrency({ code: 'usd', label: 'usd', prefixSign: true, sign: '$' })
    ).toEqual({ code: 'usd', label: 'usd', prefixSign: true, sign: '$' });
  });
});
