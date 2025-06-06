import { MutationTree } from 'vuex';

import { CurrencyState } from '../types/currency-state.interface';
import { SET_AVAILABLE_CURRENCIES, SET_SELECTED_CURRENCY, SET_CURRENCY_RATES } from '../types/mutations';
import { Currency } from '../types/currency.interface';

export const mutations: MutationTree<CurrencyState> = {
  [SET_AVAILABLE_CURRENCIES] (state, availableCurrencies: Currency[]) {
    state.availableCurrencies = availableCurrencies;
  },
  [SET_SELECTED_CURRENCY] (state, selectedCurrency: string) {
    state.selectedCurrencyCode = selectedCurrency;
  },
  [SET_CURRENCY_RATES] (state, rates: Record<string, number>) {
    state.currencyRates = rates || {};
  }
}
