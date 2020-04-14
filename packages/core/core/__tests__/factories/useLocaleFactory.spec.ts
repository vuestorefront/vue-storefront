import { UseLocale } from '../../src/types';
import { UseLocaleFactoryParams, useLocaleFactory } from '../../src/factories/useLocaleFactory';

const params: UseLocaleFactoryParams = {
  setCountry: jest.fn(async (country) => country),
  setLocale: jest.fn(async (locale) => locale),
  setCurrency: jest.fn(async (currency) => currency),
  loadAvailableLocales: jest.fn(async () => []),
  loadAvailableCountries: jest.fn(async () => []),
  loadAvailableCurrencies: jest.fn(async () => [])
};
let useLocale: () => UseLocale;

function createComposable(): void {
  useLocale = useLocaleFactory(params);
}

describe('[CORE - factories] useLocaleFactory', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('initial setup', () => {
    it('should have proper initial props', () => {
      createComposable();
      const { loading, currency, locale, country, availableLocales, availableCountries, availableCurrencies } = useLocale();
      expect(loading.value).toEqual(false);
      expect(currency.value).toEqual(null);
      expect(locale.value).toEqual(null);
      expect(country.value).toEqual(null);
      expect(availableLocales.value).toEqual([]);
      expect(availableCountries.value).toEqual([]);
      expect(availableCurrencies.value).toEqual([]);
    });
  });

  describe('methods', () => {
    beforeEach(() => {
      createComposable();
    });

    describe('setters', () => {
      it('should set exported locale to provided value', async () => {
        const { setLocale, locale } = useLocale();
        await setLocale({ code: 'en' } as any);
        expect(locale.value.code).toEqual('en');
      });

      it('should set exported country to provided value', async () => {
        const { setCountry, country } = useLocale();
        await setCountry({ code: 'us' } as any);
        expect(country.value.code).toEqual('us');
      });

      it('should set exported currency to provided value', async () => {
        const { setCurrency, currency } = useLocale();
        await setCurrency({ code: 'usd' } as any);
        expect(currency.value.code).toEqual('usd');
      });
    });

    describe('useLocaleFactory', () => {
      it('asynchronously reloads available settings', async () => {
        (params.loadAvailableLocales as jest.Mock).mockResolvedValue(['en']);
        (params.loadAvailableCountries as jest.Mock).mockResolvedValue(['gb']);
        (params.loadAvailableCurrencies as jest.Mock).mockResolvedValue(['gbp']);
        const {
          loadAvailableLocales,
          loadAvailableCountries,
          loadAvailableCurrencies,
          availableLocales,
          availableCountries,
          availableCurrencies
        } = useLocale();
        await loadAvailableLocales();
        await loadAvailableCountries();
        await loadAvailableCurrencies();

        expect(availableLocales.value).toEqual(['en']);
        expect(availableCountries.value).toEqual(['gb']);
        expect(availableCurrencies.value).toEqual(['gbp']);
      });
    });
  });
});
