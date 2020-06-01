import useLocale from '../../../src/composables/useLocale';

jest.mock('@vue/composition-api', () => ({
  getCurrentInstance: jest.fn(() => ({
    $i18n: {
      locales: [
        { country: 'us', currency: 'usd', code: 'us', name: 'United States' },
        { country: 'de', currency: 'eur', code: 'de', name: 'Deutschland'},
        { country: 'pl', currency: 'pln', code: 'pl', name: 'Poland'}
      ],
      locale: 'us',
      setLocaleCookie: jest.fn((cookie) => ({ cookie: cookie })),
      setLocale: jest.fn((locale) => ({ locale: locale }))
    }
  })),
  ref: jest.fn(param => param)
}));

describe('[about-you-cloud composables] useLocale', () => {
  describe('availableCountries', () => {
    it('returns array of available countries', () => {
      const { availableCountries } = useLocale();
      expect(availableCountries).toEqual(['us', 'de', 'pl']);
    });
  });
  describe('availableCurrencies', () => {
    it('returns array of available currencies', () => {
      const { availableCurrencies } = useLocale();
      expect(availableCurrencies).toEqual(['usd', 'eur', 'pln']);
    });
  });
  describe('currentLocale', () => {
    it('returns name of the current locale country', () => {
      const { locale } = useLocale();
      expect(locale).toEqual('United States');
    });
  });
  describe('currency', () => {
    it('returns current currency code', () => {
      const { currency } = useLocale();
      expect(currency).toEqual('usd');
    });
  });
  describe('country', () => {
    it('returns current country code', () => {
      const { country } = useLocale();
      expect(country).toEqual('us');
    });
  });
  describe('setCookie', () => {
    it('returns mocked setLocaleCookie value', () => {
      const { setCookie } = useLocale();
      expect(setCookie('us')).toEqual({ cookie: 'us' });
    });
  });
  describe('setLocale', () => {
    it('returns mocked setLocaleI18n value', () => {
      const { setLocale } = useLocale();
      expect(setLocale('us')).toEqual({ locale: 'us' });
    });
  });
});

