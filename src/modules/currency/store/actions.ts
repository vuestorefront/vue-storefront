import { ActionTree } from 'vuex';

import config from 'config'
import { extractCookieValue, processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { FETCH_AVAILABLE_CURRENCIES, FETCH_CURRENCY_RATES, SYNC, UPDATE_ACTIVE_CURRENCY } from '../types/actions';
import { CookieKey } from '../types/cookie.key';
import { countryToCurrency } from '../types/country-to-currency';
import { Currency } from '../types/currency.interface';
import { CurrencyState } from '../types/currency-state.interface';
import { LocalStorageKey } from '../types/local-storage.key';
import { SET_AVAILABLE_CURRENCIES, SET_CURRENCY_RATES, SET_SELECTED_CURRENCY, SET_ACTIVE_CURRENCY } from '../types/mutations';
import { MODULE_NAME } from '../types/module-name';
import { GET_AVAILABLE_CURRENCIES } from '../types/getters';
import { DEFAULT_CURRENCY } from '../types/default-currency';

export const actions: ActionTree<CurrencyState, RootState> = {
  async [FETCH_AVAILABLE_CURRENCIES] ({ commit }): Promise<Currency[]> {
    const url = processURLAddress(`${config.budsies.endpoint}/currencies/list`);

    const { result } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    commit(SET_AVAILABLE_CURRENCIES, result);

    return result;
  },
  async [FETCH_CURRENCY_RATES] ({ commit }): Promise<Record<string, number>> {
    const url = processURLAddress(`${config.budsies.endpoint}/currencies/rates`);

    const { result } = await TaskQueue.execute({
      url,
      payload: {
        headers: { 'Accept': 'application/json' },
        mode: 'cors',
        method: 'GET'
      },
      silent: true
    });

    const rates: Record<string, number> = {};

    for (const item of result) {
      rates[item.currency_to] = item.rate;
    }

    commit(SET_CURRENCY_RATES, rates);

    return result;
  },
  async [UPDATE_ACTIVE_CURRENCY] (
    { commit, getters },
    selectedCurrencyCode: string | undefined
  ): Promise<void> {
    const selectedCurrency = selectedCurrencyCode
      ? getters[GET_AVAILABLE_CURRENCIES].find(
        (item: Currency) => item.code === selectedCurrencyCode
      )
      : undefined;

    if (selectedCurrency) {
      commit(SET_SELECTED_CURRENCY, selectedCurrencyCode);
      commit(SET_ACTIVE_CURRENCY, selectedCurrency);
      return;
    }

    const detectedCountry = extractCookieValue(CookieKey.DETECTED_COUNTRY, document.cookie);
    const detectedCountryCurrencyCode = detectedCountry
      ? countryToCurrency[detectedCountry]
      : undefined;
    const detectedCountryCurrency = detectedCountryCurrencyCode
      ? getters[GET_AVAILABLE_CURRENCIES].find(
        (item: Currency) => item.code === detectedCountryCurrencyCode
      )
      : undefined;

    if (detectedCountryCurrency) {
      commit(SET_ACTIVE_CURRENCY, detectedCountryCurrency);
      return;
    }

    commit(SET_ACTIVE_CURRENCY, DEFAULT_CURRENCY);
  },
  async [SYNC] ({ dispatch }): Promise<void> {
    const currencyStorage = StorageManager.get(MODULE_NAME);
    const selectedCurrencyCode = await currencyStorage.getItem(LocalStorageKey.SELECTED_CURRENCY);

    await dispatch(UPDATE_ACTIVE_CURRENCY, selectedCurrencyCode);
  }
}
