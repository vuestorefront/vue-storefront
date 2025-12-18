import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus'
import { isServer } from '@vue-storefront/core/helpers';
import { StorefrontModule } from '@vue-storefront/core/lib/modules';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { usePersistedEmail } from './composables/use-persisted-email';
import { usePersistedPhoneNumber } from './composables/use-persisted-customer-phone-number';
import { usePersistedFirstName } from './composables/use-persisted-first-name';
import { usePersistedLastName } from './composables/use-persisted-last-name';
import { usePersistedShippingCountry } from './composables/use-persisted-shipping-country';
import { usePersistedVatId } from './composables/use-persisted-vat-id';
import * as getters from './types/getter';
import * as mutations from './types/mutation';
import { SN_PERSISTED_CUSTOMER_DATA } from './types/store-name';
import { persistedCustomerDataStore } from './store';
import { getItemsFromStorage } from './helpers/get-local-storage-items.function';
import { cacheHandlerFactory } from './helpers/cache-handler.factory';
import { localStorageSynchronizationFactory, UserEvents } from '../shared';

const PERSISTED_CUSTOMER_EMAIL = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_EMAIL}`;
const PERSISTED_CUSTOMER_FIRST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_FIRST_NAME}`;
const PERSISTED_CUSTOMER_LAST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_LAST_NAME}`;
const PERSISTED_CUSTOMER_PHONE_NUMBER = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_PHONE_NUMBER}`;
const PERSISTED_CUSTOMER_SHIPPING_COUNTRY = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`;
const PERSISTED_CUSTOMER_VAT_ID = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_VAT_ID}`;
const PERSISTED_CUSTOMER_DATA = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.PERSISTED_CUSTOMER_DATA}`;
const CUSTOMER_DATA_HASH = `${SN_PERSISTED_CUSTOMER_DATA}/${getters.CUSTOMER_DATA_HASH}`;

const SET_PERSISTED_CUSTOMER_EMAIL = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_EMAIL}`;
const SET_PERSISTED_CUSTOMER_FIRST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_FIRST_NAME}`;
const SET_PERSISTED_CUSTOMER_LAST_NAME = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_LAST_NAME}`;
const SET_PERSISTED_CUSTOMER_PHONE_NUMBER = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_PHONE_NUMBER}`;
const SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY}`;
const SET_PERSISTED_CUSTOMER_VAT_ID = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_VAT_ID}`;
const SET_PERSISTED_CUSTOMER_BILLING_ADDRESS = `${SN_PERSISTED_CUSTOMER_DATA}/${mutations.SET_PERSISTED_CUSTOMER_BILLING_ADDRESS}`;

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
    store.commit(SET_PERSISTED_CUSTOMER_EMAIL, undefined);
    store.commit(SET_PERSISTED_CUSTOMER_FIRST_NAME, undefined);
    store.commit(SET_PERSISTED_CUSTOMER_LAST_NAME, undefined);
    store.commit(SET_PERSISTED_CUSTOMER_PHONE_NUMBER, undefined);
    store.commit(SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY, undefined);
    store.commit(SET_PERSISTED_CUSTOMER_VAT_ID, undefined);
  });

  store.watch(
    (_, getters) => getters[CUSTOMER_DATA_HASH],
    (newValue, oldValue) => {
      if (newValue !== oldValue) {
        EventBus.$emit(
          UserEvents.CUSTOMER_DATA_CHANGED,
          store.getters[PERSISTED_CUSTOMER_DATA]
        );
      }
    }
  )
}

export {
  PERSISTED_CUSTOMER_EMAIL,
  PERSISTED_CUSTOMER_FIRST_NAME,
  PERSISTED_CUSTOMER_LAST_NAME,
  PERSISTED_CUSTOMER_PHONE_NUMBER,
  PERSISTED_CUSTOMER_SHIPPING_COUNTRY,
  PERSISTED_CUSTOMER_VAT_ID,
  PERSISTED_CUSTOMER_DATA,
  SET_PERSISTED_CUSTOMER_EMAIL,
  SET_PERSISTED_CUSTOMER_FIRST_NAME,
  SET_PERSISTED_CUSTOMER_LAST_NAME,
  SET_PERSISTED_CUSTOMER_PHONE_NUMBER,
  SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY,
  SET_PERSISTED_CUSTOMER_VAT_ID,
  SET_PERSISTED_CUSTOMER_BILLING_ADDRESS,
  usePersistedEmail,
  usePersistedFirstName,
  usePersistedLastName,
  usePersistedPhoneNumber,
  usePersistedShippingCountry,
  usePersistedVatId
}
