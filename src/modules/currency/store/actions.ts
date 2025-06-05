import { ActionTree } from 'vuex';

import config from 'config'
import { processURLAddress } from '@vue-storefront/core/helpers';
import { TaskQueue } from '@vue-storefront/core/lib/sync';
import RootState from '@vue-storefront/core/types/RootState';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'

import { FETCH_AVAILABLE_CURRENCIES, FETCH_CURRENCY_RATES, SYNC } from '../types/actions';
import { Currency } from '../types/currency.interface';
import { CurrencyState } from '../types/currency-state.interface';
import { SET_AVAILABLE_CURRENCIES, SET_CURRENCY_RATES, SET_SELECTED_CURRENCY } from '../types/mutations';
import { MODULE_NAME } from '../types/module-name';
import { LocalStorageKey } from '../types/local-storage.key';

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

    commit(SET_AVAILABLE_CURRENCIES, result.currencies);

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
  async [SYNC] ({ commit }): Promise<void> {
    const currencyStorage = StorageManager.get(MODULE_NAME);
    const selectedCurrency = await currencyStorage.getItem(LocalStorageKey.SELECTED_CURRENCY);

    if (selectedCurrency) {
      commit(SET_SELECTED_CURRENCY, selectedCurrency);
    }
  }
}
