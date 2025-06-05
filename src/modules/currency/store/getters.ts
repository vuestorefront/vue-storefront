import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { CurrencyState } from '../types/currency-state.interface';
import { Currency } from '../types/currency.interface';
import { DEFAULT_CURRENCY } from '../types/default-currency';
import { GET_AVAILABLE_CURRENCIES, GET_SELECTED_CURRENCY, GET_CURRENCY_RATES, GET_CURRENCY_EXCHANGE_RATE } from '../types/getters';

export const getters: GetterTree<CurrencyState, RootState> = {
  [GET_AVAILABLE_CURRENCIES] (state): Currency[] {
    return state.availableCurrencies;
  },
  [GET_SELECTED_CURRENCY] (state): Currency {
    const currency = state.availableCurrencies.find(
      (item) => item.code === state.selectedCurrencyCode
    );

    return currency || DEFAULT_CURRENCY;
  },
  [GET_CURRENCY_RATES] (state): Record<string, number> {
    return state.currencyRates;
  },
  [GET_CURRENCY_EXCHANGE_RATE] (state): number {
    return state.currencyRates[state.selectedCurrencyCode] || 1;
  }
}
