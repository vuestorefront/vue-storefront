import { CurrencyState } from '../types/currency-state.interface';

export const state: CurrencyState = {
  availableCurrencies: [],
  selectedCurrencyCode: undefined,
  currencyRates: {},
  detectedCountryCurrency: undefined
}
