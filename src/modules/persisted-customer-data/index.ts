import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { usePersistedEmail } from './composables/use-persisted-email';
import { usePersistedPhoneNumber } from './composables/use-persisted-customer-phone-number';
import { usePersistedFirstName } from './composables/use-persisted-first-name';
import { usePersistedLastName } from './composables/use-persisted-last-name';
import { usePersistedShippingCountry } from './composables/use-persisted-shipping-country';
import * as getters from './types/getter';
import * as mutations from './types/mutation';
import { SN_PERSISTED_CUSTOMER_DATA } from './types/store-name';
import { persistedCustomerDataStore } from './store';
import { getItemsFromStorage } from './helpers/get-local-storage-items.function';
import { cacheHandlerFactory } from './helpers/cache-handler.factory';
import { localStorageSynchronizationFactory } from '../shared';

const LAST_USED_CUSTOMER_EMAIL = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.LAST_USED_CUSTOMER_EMAIL}`;
const LAST_USED_CUSTOMER_FIRST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.LAST_USED_CUSTOMER_FIRST_NAME}`;
const LAST_USED_CUSTOMER_LAST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.LAST_USED_CUSTOMER_LAST_NAME}`;
const LAST_USED_CUSTOMER_PHONE_NUMBER = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.LAST_USED_CUSTOMER_PHONE_NUMBER}`;
const LAST_USED_CUSTOMER_SHIPPING_COUNTRY = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.LAST_USED_CUSTOMER_SHIPPING_COUNTRY}`;

const SET_LAST_USED_CUSTOMER_EMAIL = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_LAST_USED_CUSTOMER_EMAIL}`;
const SET_LAST_USED_CUSTOMER_FIRST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_LAST_USED_CUSTOMER_FIRST_NAME}`;
const SET_LAST_USED_CUSTOMER_LAST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_LAST_USED_CUSTOMER_LAST_NAME}`;
const SET_LAST_USED_CUSTOMER_PHONE_NUMBER = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_LAST_USED_CUSTOMER_PHONE_NUMBER}`;
const SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY}`;

export const PersistedCustomerDataModule: StorefrontModule = async function ({ store }) {
  StorageManager.init(SN_PERSISTED_CUSTOMER_DATA);
  store.registerModule(SN_PERSISTED_CUSTOMER_DATA, persistedCustomerDataStore)

  if (isServer) {
    return;
  }

  const localStorageSynchronization = localStorageSynchronizationFactory(
    getItemsFromStorage,
    cacheHandlerFactory()
  );

  store.subscribe(localStorageSynchronization.setItems);

  store.dispatch(`${SN_PERSISTED_CUSTOMER_DATA}/synchronize`);
  EventBus.$on('user-after-logout', () => {
    store.commit(SET_LAST_USED_CUSTOMER_EMAIL, undefined);
    store.commit(SET_LAST_USED_CUSTOMER_FIRST_NAME, undefined);
    store.commit(SET_LAST_USED_CUSTOMER_LAST_NAME, undefined);
    store.commit(SET_LAST_USED_CUSTOMER_PHONE_NUMBER, undefined);
    store.commit(SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY, undefined);
  })
}

export {
  LAST_USED_CUSTOMER_EMAIL,
  LAST_USED_CUSTOMER_FIRST_NAME,
  LAST_USED_CUSTOMER_LAST_NAME,
  LAST_USED_CUSTOMER_PHONE_NUMBER,
  LAST_USED_CUSTOMER_SHIPPING_COUNTRY,
  SET_LAST_USED_CUSTOMER_EMAIL,
  SET_LAST_USED_CUSTOMER_FIRST_NAME,
  SET_LAST_USED_CUSTOMER_LAST_NAME,
  SET_LAST_USED_CUSTOMER_PHONE_NUMBER,
  SET_LAST_USED_CUSTOMER_SHIPPING_COUNTRY,
  usePersistedEmail,
  usePersistedFirstName,
  usePersistedLastName,
  usePersistedPhoneNumber,
  usePersistedShippingCountry
}
