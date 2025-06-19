import EventBus from '@vue-storefront/core/compatibility/plugins/event-bus';

import { UserEvents } from 'src/modules/shared';

import { PersistedCustomerData } from '../types/persisted-customer-data.interface';

export function notifyCustomerDataChanged (data: PersistedCustomerData): void {
  EventBus.$emit(
    UserEvents.CUSTOMER_DATA_CHANGED,
    {
      customerId: data.id,
      customerEmail: data.email,
      customerFirstName: data.billingAddress.firstName || data.firstName,
      customerLastName: data.billingAddress.lastName || data.lastName,
      customerPhoneNumber: data.billingAddress.phoneNumber || data.phoneNumber,
      customerCity: data.billingAddress.city,
      customerState: data.billingAddress.state,
      customerZipCode: data.billingAddress.zipCode,
      customerCountry: data.billingAddress.country
    }
  );
}
