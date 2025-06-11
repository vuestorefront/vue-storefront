import { GetterTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';

import { CurrencyState } from '../types/currency-state.interface';
import { Currency } from '../types/currency.interface';
import { DEFAULT_CURRENCY } from '../types/default-currency';
import { GET_AVAILABLE_CURRENCIES, GET_SELECTED_CURRENCY, GET_CURRENCY_RATES, GET_CURRENCY_EXCHANGE_RATE, GET_ACTIVE_CURRENCY_CODE } from '../types/getters';

export const getters: GetterTree<CurrencyState, RootState> = {
  [GET_AVAILABLE_CURRENCIES] (state): Currency[] {
    return state.availableCurrencies;
  },
  [GET_ACTIVE_CURRENCY_CODE] (state): string {
    return state.selectedCurrencyCode || state.detectedCountryCurrency || DEFAULT_CURRENCY.code;
  },
  [GET_SELECTED_CURRENCY] (state, getters): Currency {
    const currencyCode = getters[GET_ACTIVE_CURRENCY_CODE];

    const currency = state.availableCurrencies.find(
      (item) => item.code === currencyCode
    );

    return currency || DEFAULT_CURRENCY;
  },
  [GET_CURRENCY_RATES] (state): Record<string, number> {
    return state.currencyRates;
  },
  [GET_CURRENCY_EXCHANGE_RATE] (state, getters): number {
    const activeCurrencyCode = getters[GET_SELECTED_CURRENCY].code;
    return state.currencyRates[activeCurrencyCode] || 1;
  }
}
