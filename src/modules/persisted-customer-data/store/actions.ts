import { ActionTree } from 'vuex';

import RootState from '@vue-storefront/core/types/RootState';
import { StorageManager } from '@vue-storefront/core/lib/storage-manager';

import { SN_BUDSIES } from 'src/modules/budsies/store/mutation-types';

import { StoreState } from '../types/store-state.interface';
import { SN_PERSISTED_CUSTOMER_DATA } from '../types/store-name';
import { EMAIL, FIRST_NAME, LAST_NAME, PHONE_NUMBER, SHIPPING_COUNTRY, VAT_ID } from '../types/local-storage-key';
import { SET_PERSISTED_CUSTOMER_EMAIL, SET_PERSISTED_CUSTOMER_FIRST_NAME, SET_PERSISTED_CUSTOMER_LAST_NAME, SET_PERSISTED_CUSTOMER_PHONE_NUMBER, SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY, SET_PERSISTED_CUSTOMER_VAT_ID } from '../types/mutation';

export const actions: ActionTree<StoreState, RootState> = {
  async synchronize ({ commit }): Promise<void> {
    const persistedCustomerDataStorage = StorageManager.get(
      SN_PERSISTED_CUSTOMER_DATA
    );

    let email = await persistedCustomerDataStorage.getItem(EMAIL);
    const firstName = await persistedCustomerDataStorage.getItem(FIRST_NAME);
    const lastName = await persistedCustomerDataStorage.getItem(LAST_NAME);
    const phoneNumber = await persistedCustomerDataStorage.getItem(PHONE_NUMBER);
    const shippingCountry = await persistedCustomerDataStorage.getItem(SHIPPING_COUNTRY);
    const vatId = await persistedCustomerDataStorage.getItem(VAT_ID);

    // Backwards compatibility for previous used local storage key
    if (!email) {
      const budsiesStorage = StorageManager.get(SN_BUDSIES);
      email = await budsiesStorage.getItem('customer-email');
    }

    if (email) {
      commit(SET_PERSISTED_CUSTOMER_EMAIL, email);
    }

    if (firstName) {
      commit(SET_PERSISTED_CUSTOMER_FIRST_NAME, firstName);
    }

    if (lastName) {
      commit(SET_PERSISTED_CUSTOMER_LAST_NAME, lastName);
    }

    if (phoneNumber) {
      commit(SET_PERSISTED_CUSTOMER_PHONE_NUMBER, phoneNumber);
    }

    if (shippingCountry) {
      commit(SET_PERSISTED_CUSTOMER_SHIPPING_COUNTRY, shippingCountry);
    }

    if (vatId) {
      commit(SET_PERSISTED_CUSTOMER_VAT_ID, vatId);
    }
  }
}
