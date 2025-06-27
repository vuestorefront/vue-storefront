import { CurrencyState } from '../types/currency-state.interface';
import { DEFAULT_CURRENCY } from '../types/default-currency';

export const state: CurrencyState = {
  availableCurrencies: [],
  selectedCurrencyCode: undefined,
  currencyRates: {},
  activeCurrency: DEFAULT_CURRENCY
}
