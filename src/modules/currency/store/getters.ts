import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { CurrencyState } from '../types/currency-state.interface';
import { Currency } from '../types/currency.interface';
import { GET_AVAILABLE_CURRENCIES, GET_ACTIVE_CURRENCY, GET_CURRENCY_RATES, GET_CURRENCY_EXCHANGE_RATE } from '../types/getters';

export const getters: GetterTree<CurrencyState, RootState> = {
  [GET_AVAILABLE_CURRENCIES] (state): Currency[] {
    return state.availableCurrencies;
  },
  [GET_ACTIVE_CURRENCY] (state): Currency {
    return state.activeCurrency;
  },
  [GET_CURRENCY_RATES] (state): Record<string, number> {
    return state.currencyRates;
  },
  [GET_CURRENCY_EXCHANGE_RATE] (state, getters): number {
    const activeCurrencyCode = getters[GET_ACTIVE_CURRENCY].code;
    return state.currencyRates[activeCurrencyCode] || 1;
  }
}
