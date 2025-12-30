import BaseAddressDetails from 'core/modules/checkout/types/BaseAddressDetails';

import { ValidationStatus } from './validation-status';

export interface AddressValidationExtensionAttributes {
  validation_status_id?: ValidationStatus,
  validation_customer_override?: boolean,
  validation_warnings?: string,
  validation_suggested_address?: Partial<BaseAddressDetails>
}
