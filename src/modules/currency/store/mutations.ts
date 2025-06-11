import Vue from 'vue';
import { MutationTree } from 'vuex';

import { CurrencyState } from '../types/currency-state.interface';
import { SET_AVAILABLE_CURRENCIES, SET_SELECTED_CURRENCY, SET_CURRENCY_RATES, SET_DETECTED_COUNTRY_CURRENCY } from '../types/mutations';
import { Currency } from '../types/currency.interface';

export const mutations: MutationTree<CurrencyState> = {
  [SET_AVAILABLE_CURRENCIES] (state, availableCurrencies: Currency[]) {
    state.availableCurrencies = availableCurrencies;
  },
  [SET_SELECTED_CURRENCY] (state, selectedCurrency: string) {
    Vue.set(state, 'selectedCurrencyCode', selectedCurrency);
  },
  [SET_CURRENCY_RATES] (state, rates: Record<string, number>) {
    state.currencyRates = rates || {};
  },
  [SET_DETECTED_COUNTRY_CURRENCY] (state, detectedCountryCurrency: string | undefined) {
    Vue.set(state, 'detectedCountryCurrency', detectedCountryCurrency);
  }
}
