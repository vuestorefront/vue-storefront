import { MutationPayload } from 'vuex';

import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager'
import LocalForageCacheDriver from '@vue-storefront/core/lib/store/storage';
import RootState from '@vue-storefront/core/types/RootState';
import { CART_SET_EXCHANGE_RATE_MUTATION } from '@vue-storefront/core/modules/cart';
import { SET_EXCHANGE_RATE_MUTATION } from '@vue-storefront/core/modules/catalog';

import { localStorageSynchronizationFactory } from 'src/modules/shared';

import { cacheHandlerFactory } from './helpers/cache-handler.factory';
import { module } from './store';
import { FETCH_AVAILABLE_CURRENCIES, FETCH_CURRENCY_RATES, SYNC } from './types/actions';
import * as getters from './types/getters';
import { Currency } from './types/currency.interface';
import { MODULE_NAME } from './types/module-name';

import CurrencySelector from './components/currency-selector.vue';
import { getItemsFromStorageFactory } from './helpers/get-local-storage-items';
import { SET_CURRENCY_RATES, SET_ACTIVE_CURRENCY } from './types/mutations';
import { DEFAULT_CURRENCY } from './types/default-currency';

const FETCH_AVAILABLE_CURRENCIES_ACTION = `${MODULE_NAME}/${FETCH_AVAILABLE_CURRENCIES}`;
const FETCH_CURRENCY_RATES_ACTION = `${MODULE_NAME}/${FETCH_CURRENCY_RATES}`;
const GET_ACTIVE_CURRENCY = `${MODULE_NAME}/${getters.GET_ACTIVE_CURRENCY}`;
const GET_CURRENCY_EXCHANGE_RATE = `${MODULE_NAME}/${getters.GET_CURRENCY_EXCHANGE_RATE}`;

export const CurrencyModule: StorefrontModule = async function ({ store }) {
  const currencyStorage: LocalForageCacheDriver = StorageManager.init(MODULE_NAME);
  store.registerModule(`${MODULE_NAME}`, module);

  if (isServer) {
    return;
  }

  const localStorageSynchronization = localStorageSynchronizationFactory(
    getItemsFromStorageFactory(store),
    cacheHandlerFactory(currencyStorage)
  );

  store.dispatch(`${MODULE_NAME}/${SYNC}`);

  store.subscribe((mutation: MutationPayload, state: RootState) => {
    localStorageSynchronization.setItems(mutation, state);

    if (
      mutation.type.endsWith(SET_ACTIVE_CURRENCY) ||
      mutation.type.endsWith(SET_CURRENCY_RATES)
    ) {
      const exchangeRate = store.getters[GET_CURRENCY_EXCHANGE_RATE];

      store.commit(CART_SET_EXCHANGE_RATE_MUTATION, exchangeRate);
      store.commit(SET_EXCHANGE_RATE_MUTATION, exchangeRate);
    }
  });
}

export {
  Currency,
  CurrencySelector,
  DEFAULT_CURRENCY,
  FETCH_AVAILABLE_CURRENCIES_ACTION,
  FETCH_CURRENCY_RATES_ACTION,
  GET_ACTIVE_CURRENCY,
  GET_CURRENCY_EXCHANGE_RATE
}
