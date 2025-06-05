import { Store } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';
import { checkMultiStoreLocalStorageKey } from 'src/modules/shared/helpers/check-multi-store-local-storage-key.function';
import { parseLocalStorageValue } from 'src/modules/shared';

import { LocalStorageKey } from '../types/local-storage.key';
import { MODULE_NAME } from '../types/module-name';
import { SET_SELECTED_CURRENCY, SET_AVAILABLE_CURRENCIES, SET_CURRENCY_RATES } from '../types/mutations';

export function getItemsFromStorageFactory (store: Store<RootState>) {
  return function getItemsFromStorage ({ key }: StorageEvent) {
    if (!key) {
      return;
    }

    const isSelectedCurrencyChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LocalStorageKey.SELECTED_CURRENCY}`
    );
    const isAvailableCurrenciesChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LocalStorageKey.AVAILABLE_CURRENCIES}`
    );
    const isCurrencyRatesChanged = checkMultiStoreLocalStorageKey(
      key,
      `${MODULE_NAME}/${LocalStorageKey.CURRENCY_RATES}`
    );

    let value = parseLocalStorageValue(localStorage[key]);

    if (!value) {
      return;
    }

    if (isSelectedCurrencyChanged) {
      store.commit(`${MODULE_NAME}/${SET_SELECTED_CURRENCY}`, value);
    }

    if (isAvailableCurrenciesChanged) {
      store.commit(`${MODULE_NAME}/${SET_AVAILABLE_CURRENCIES}`, value);
    }

    if (isCurrencyRatesChanged) {
      store.commit(`${MODULE_NAME}/${SET_CURRENCY_RATES}`, value);
    }
  }
}
